import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TodoDataService } from '../service/data/todo-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export class Todo {

  constructor(public id: number, 
    public description: string,
    public done: boolean,
    public targetDate: Date){}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos:Todo[];
  datePipe;
  message:string;

  constructor(private service: TodoDataService, private router: Router) {
      this.datePipe = new DatePipe('en-US');
      /* this.todos.push(new Todo(1, 'Learn to Dance', false, new Date()));
      this.todos.push(new Todo(2, 'Become an Expert at Angular', false, new Date()));
      this.todos.push(new Todo(3, 'Visit India', false, new Date())); */
   }

  ngOnInit(): void {
    this.service.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id:number){
    this.service.deleteTodo('in28minutes',id).subscribe(
      response => {
        const indexToDelete = this.todos.findIndex(todo=> todo.id === id);
        this.todos.splice(indexToDelete,1);
        this.message='Successfuly deleted todo';
      },
      (error: HttpErrorResponse) => {
        this.message = 'Unable to delete todo';
      },
      () => {
      }
    );
  }
  updateTodo(id:number){
    this.router.navigate(['todos',id]);
  }

  addTodo(){
    this.router.navigate(['todos',-1],);
  }
}
