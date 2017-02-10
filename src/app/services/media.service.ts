import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: any = {};


  constructor(private http: Http, private loginService: LoginService, private router: Router) {
  }

  //gets media to front page

  getMedia = () => {
    return this.http.get(this.url + '/media')
      .map(
      res =>
        res.json()

      );
  }

  //this is used to get more media to front page

  getNew = (amount: number) => {
    //GET http://[BASE-URL]/media?start=10&limit=10
    return this.http.get(this.url + `/media?limit=${amount}`);
  };

  //uploading the media to server and takes formdata as parameter

  postMedia = (formContent: any) => {
    // this.http.post(this.url, this.user,.....)
    return this.http.post(this.url + '/media?token=' + JSON.parse(localStorage.getItem("user")).token, formContent)
      .map(
      resp => {
        resp.json();
        this.router.navigate(['front']);
      },
      error => {
        console.log(error);
      }
      );
  }

  //get one mediafile to media display page and needs file_id as parameter

  getMediaFile = (fileid: any) => {
    return this.http.get(this.url + '/media/' + fileid)
      .map(
      respo =>
        respo.json()

      );

  }

  //gets all userdata from server and needs user_id as parameter

  getUserInfo = (userid: any) => {
    return this.http.get(this.url + '/users/' + userid + '?token=' + JSON.parse(localStorage.getItem("user")).token)
      .map(
      re =>
        re.json()
      );
  }

  //gets favorites to specific mediafile and needs file_id as parameter

  getFavorites = (id: number) => {
    return this.http.get(this.url + `/favourites/file/${id}`);
  }

  //liking media and needs file_id as parameter

  likeMedia = (id: number) => {
    console.log("liking: " + id);
    this.token = JSON.parse(localStorage.getItem("user")).token;
    console.log(this.token);
    return this.http.post(this.url + `/favourites?token=` + this.token, {"file_id": id});
  }

  //disliking media and needs file_id as parameter

  dislikeMedia = (id: number) => {
    console.log("disliking: " + id);
    this.token = JSON.parse(localStorage.getItem("user")).token;
    console.log(this.token);
    return this.http.delete(this.url + `/favourites/file/${id}?token=` + this.token);
  }

}


