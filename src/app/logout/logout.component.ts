import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
   

    
  }
   logout =() =>{
      localStorage.removeItem("user");
    this.loginService.logged = false;
    this.router.navigate(['login']);
    }

}
