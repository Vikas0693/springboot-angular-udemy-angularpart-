import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='in28Minutes'
  password=""
  errorMessage='Invalid Credentials'
  invalidLogin = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin(){
    console.log(`Username : ${this.username}`);
    if(this.username==='in28Minutes' && this.password==='dummy'){
      this.invalidLogin=false;
      this.router.navigate(['welcome',this.username]);
    }
    else
      this.invalidLogin=true;
  }
}
