import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice';
import {  RouterLink } from '@angular/router';
import { TaskService } from '../../services/taskservice';
import { TaskItem } from '../../interfaces/task-item';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './dashboard.html'
})

export class DashboardPage implements OnInit{


   userName = localStorage.getItem('username');
   taskform : FormGroup;

  constructor(private ngZone: NgZone,private cd: ChangeDetectorRef, private fb:FormBuilder, private taskservice : TaskService , private auth: AuthService) {
    this.taskform = this.fb.group({
      title: ['', Validators.required],
      description : ['', Validators.required]
    });
    console.log(auth);
  }

  tasks: TaskItem[] = [];
 
  ngOnInit(){
   console.log('Dashboard Initialize');
    this.getTasks();
  }

  onLogout() {
    this.auth.logout()
  }
   onAddTask() {
    console.log('Clicked ');
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
        this.tasks = this.tasks.filter(task => task.id !== id); // update list without refresh
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

