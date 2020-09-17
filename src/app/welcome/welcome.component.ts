import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { WelcomeDataService } from '../service/data/welcome-data.service'
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name= '';
  welcomeMessageFromString:string;
  constructor(private route: ActivatedRoute, private service: WelcomeDataService) { }

  ngOnInit(): void {
    this.name=this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
    console.log(this.service.executeHelloWorldBeanServiceWithPathVariable(this.name));
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name)
    .subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response: HelloWorldBean){
    this.welcomeMessageFromString = response.message;
    console.log(response.message);
  }

  handleErrorResponse(error){
    this.welcomeMessageFromString = error.error.message;
  }
}
export interface HelloWorldBean{
  message: string
}
