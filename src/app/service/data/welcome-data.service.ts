import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HelloWorldBean } from 'src/app/welcome/welcome.component';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private route: ActivatedRoute, private http:HttpClient) { }

  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world/path-variable/vikas');
  }
}
