import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskItem } from '../interfaces/task-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:5094/api/tasks';
    

    constructor(private http : HttpClient){    }

    getTasks(): Observable<TaskItem[]>{
      return this.http.get<TaskItem[]>(this.apiUrl);
    }
    createTask( task : TaskItem)
    {
      return this.http.post<TaskItem>(this.apiUrl, task);
    }
    updateTask(id : number, task : TaskItem){
        return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, task)
    }
    dltTask(id : number){ 
        return this.http.delete(`${this.apiUrl}/${id}`);
    }


}
