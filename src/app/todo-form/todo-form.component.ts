import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OnlineService } from '../online.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  name!: string;
  taskName!: string;
  status: boolean = false
  localData:any = [];

  constructor(private todoService: OnlineService, private httpClient:HttpClient) {}

  ngOnInit(): void {
    this.localData = JSON.parse(localStorage.getItem('offlineTodos') || '[]')
    console.log(this.localData)
    // this.todoService.onlineStatusChanged.subscribe((isOnline) => {
    //   if (isOnline) {
    //     this.todoService.syncOfflineTodos();
    //     this.name = '';
    //     this.taskName=''
    //   }
    // });
  }

  onSubmit(todoForm: NgForm) {
    todoForm.control.markAllAsTouched()
    console.log(todoForm.value)
    if (todoForm.valid) {
      const todoData = {
        name: this.name,
        taskName: this.taskName,
        status:false
      };
      
      // Save to local storage when offline
      if (!navigator.onLine) {
        this.todoService.saveTodoLocally(todoData);
        todoForm.reset()
        return;
      }else if(navigator.onLine){
        this.todoService.syncOfflineTodos();
        if(this.localData.length == 0){
          this.todoService.httpClient.post('http://localhost:3000/myTodos', todoData).subscribe((res: any) => {
            console.log(res);
            this.name = '';
            this.taskName = '';
          });
        }
        todoForm.reset()

      }

      // Send data to the server when online
      

      // Send data to the server when online
     
    }else{
      console.log('error')
    }
    this.localData = JSON.parse(localStorage.getItem('offlineTodos') || '[]')

  }

}
