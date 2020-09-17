import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = "token";
export const AUTHENTICATED_USER = "authenticatedUser"

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  getAuthenticatedUser():string | null{
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return user;
  }

  getAuthenticatedToken():string | null{
    if(this.getAuthenticatedUser){
      return sessionStorage.getItem(TOKEN);
    }
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
  }

  executeBasicAuthenticationService(username, password){
    const basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password)
    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,{
      headers: header
    }).pipe(
      map(
        data => {
          console.log('setting session storage with authenticatedUser');
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }

}

export class AuthenticationBean {

  constructor(public message:string){}
}
