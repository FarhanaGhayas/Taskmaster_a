import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice';
import {  RouterLink } from '@angular/router';
import { TaskService } from '../../services/taskservice';
import { TaskItem } from '../../interfaces/task-item';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.html'
})

export class DashboardPage implements OnInit{
  constructor(private taskservice : TaskService , private auth: AuthService) {}

  tasks: TaskItem[] = [];
  
  ngOnInit(){
    this.taskservice.getTasks().subscribe({
            next: (data) => {
              this.tasks = data;
            },
            error: (err) => {
              console.error('Error fetching tasks:', err);
            }
          });
  }

  onLogout() {
    this.auth.logout()
  }
}