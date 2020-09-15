import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelloWorldBean } from 'src/app/welcome/welcome.component';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private route: ActivatedRoute, private http:HttpClient) { }

  executeHelloWorldBeanService(){
    let authString = this.createBasicAuthenticationHttpHeader();
    let header = new HttpHeaders({
      Authorization: authString
    });
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world/path-variable/vikas',{
      headers: header
    });
  }

  createBasicAuthenticationHttpHeader(){
    const username="in28minutes";
    const password="dummy";
    let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password)
    return basicAuthHeaderString;
  }
}
