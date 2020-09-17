import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable(/*{
  providedIn: 'root'//since we have to define this in providers array of app.module we commented it here
}*/)
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HttpInterceptorBasicAuthService : called uri :'+request.url);
    //const username="in28minutes";
    //const password="dummy";
    //let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password)
    const basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    if(basicAuthHeaderString && username){
      request = request.clone({
        setHeaders:{
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(request);
  }
}
