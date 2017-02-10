import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {MediaService} from "../services/media.service";

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  private images: any = [];

  private url = "http://media.mw.metropolia.fi/wbma/uploads/";
  constructor(private loginService: LoginService, private router: Router, private mediaService: MediaService) { }

  ngOnInit() {
   // if(!this.loginService.logged)
     // this.router.navigate(['login']);

     console.log (this.loginService.logged);

    this.mediaService.getMedia().subscribe(
      res => {
        console.log(res);
        this.images = res;
      }
    );
  }

}
