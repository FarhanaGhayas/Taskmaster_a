import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice';
import {  RouterLink } from '@angular/router';
import { TaskService } from '../../services/taskservice';
import { TaskItem } from '../../interfaces/task-item';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './dashboard.html'
})

export class DashboardPage implements OnInit{

   modalMode : 'add' | 'edit' = 'add';
   currentTaskId: number | null = null;
   userName = localStorage.getItem('username');
   taskform : FormGroup;

  constructor(private ngZone: NgZone,private cd: ChangeDetectorRef, private fb:FormBuilder, private taskservice : TaskService , private auth: AuthService) {
    this.taskform = this.fb.group({
      title: ['', Validators.required],
      description : ['', Validators.required]
    });
   // console.log(auth);
  }

  tasks: TaskItem[] = [];
 
  ngOnInit(){
   //console.log('Dashboard Initialize');
    this.getTasks();
  }

  onLogout() {
    this.auth.logout()
  }
  onSubmitTask(){
     if (this.taskform.invalid) return;

  if (this.modalMode == 'edit' && this.currentTaskId) {
    // Update existing task
       this.taskservice.updateTask(this.currentTaskId, this.taskform.value).subscribe(() => {
      console.log('Task updated');
      this.getTasks();
      this.closeModal();
    });
  } else {
    // Add new task
      this.addTask();
      this.closeModal();
    
  }
  }
  closeModal() {
    const modalElement = document.getElementById('taskModal');
  if (modalElement) {
    const modalInstance =bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();
  }
  }
  openAddModal() {
  this.modalMode = 'add';
  this.taskform.reset();
  this.currentTaskId = null;
  this.showModal();
}
openEditModal(task: TaskItem) {
  this.modalMode = 'edit';
  this.currentTaskId = task.id;
  this.taskform.patchValue({
    title: task.title,
    description: task.description
  });
  this.showModal();
}
showModal() {
  const modalEl = document.getElementById('taskModal');
  //console.log(modalEl);
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}
   addTask() {
   // console.log('Clicked ');
    if (this.taskform.invalid) return;

    this.taskservice.createTask(this.taskform.value).subscribe(() => {
      this.taskform.reset();
      alert('✅ Task added successfully');
     this.getTasks();
    });
  }

  dltTask(id:number) {
      if (confirm('Are you sure you want to delete this task?')) {
    this.taskservice.dltTask(id).subscribe({
      next: () => {
        alert('✅ Task deleted successfully');
      this.getTasks();
      },
      error: (err) => {
        alert('❌ Failed to delete task');
        console.error(err);
      }
    });
  }


  }

   getTasks() {
      this.taskservice.getTasks().subscribe({
            next: (data) => {
             this.ngZone.run(() => {
              this.tasks = data;
              this.cd.detectChanges(); // Force refresh
             });
            },
            error: (err) => {
              console.error('Error fetching tasks:', err);
            }
          });
  }

}

