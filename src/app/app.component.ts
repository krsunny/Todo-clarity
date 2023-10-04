import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username!:string
  result: any;
  showForm:boolean=false
  status:boolean=false




  constructor(private httpClient:HttpClient){
   
  }

  
  ngOnInit(){
  }

  toggleForm(){
    this.showForm=!this.showForm
  }

  clear(){
    this.result=''
    this.username = ''

  }

  toggleStatus(item:any){
    this.httpClient.patch(`http://localhost:3000/myTodos/${item.id}`,{status:item.status}).subscribe((res:any)=>{
      console.log(res)
    })
  }
  

  search(event:any){
    this.httpClient.get(`http://localhost:3000/myTodos?name=${this.username}`).subscribe((res:any)=>{
      console.log(res)
      this.result = res
    })
  }
}
