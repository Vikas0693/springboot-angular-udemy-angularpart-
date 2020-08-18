import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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

  todos = []  
  datePipe;

  constructor() {
      this.datePipe = new DatePipe('en-US');
      this.todos.push(new Todo(1, 'Learn to Dance', false, new Date()));
      this.todos.push(new Todo(2, 'Become an Expert at Angular', false, new Date()));
      this.todos.push(new Todo(3, 'Visit India', false, new Date()));
   }

  ngOnInit(): void {
  }

}
