import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='in28minutes'
  password="dummy"
  errorMessage='Invalid Credentials'
  invalidLogin = false

  constructor(private router: Router, private hardcodedAuthentication: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }


  ngOnInit(): void {
  }

  handleLogin(){
    console.log(`Username : ${this.username}`);
    //if(this.username==='in28Minutes' && this.password==='dummy'){
    if(this.hardcodedAuthentication.authenticate(this.username, this.password)){
      this.invalidLogin=false;
      this.router.navigate(['welcome',this.username]);
    }
    else
      this.invalidLogin=true;
  }

  handleBasicAuthLogin(){
    console.log(`IN handleBasicAuthLogin Username : ${this.username}`);
    this.basicAuthenticationService.executeBasicAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['welcome',this.username]);
        this.invalidLogin = false;
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }

  handleJWTAuthLogin(){
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['welcome',this.username]);
        this.invalidLogin = false;
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }
}
