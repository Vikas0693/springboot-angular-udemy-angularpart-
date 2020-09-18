import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'src/app/list-todos/list-todos.component';

import { API_URL, JPA_API_URL } from './../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retrieveAllTodos(username: string){
    return this.http.get<Todo[]>(`${JPA_API_URL}/users/${username}/todos`);
  }

  deleteTodo(username, id){
    return this.http.delete(`${JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodo(username, id){
    return this.http.get<Todo>(`${JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id: number, todo:Todo){
    return this.http.put<Todo>(`${JPA_API_URL}/users/${username}/todos/${id}`,todo);
  }

  createTodo(username,todo){
    return this.http.post<Todo>(`${JPA_API_URL}/users/${username}/todos/`,todo);
  }

}
