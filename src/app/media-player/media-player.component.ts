import { MediaService } from './../services/media.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  private file: any = [];
  private user: any = [];
  private fileid: any;

  private favorite: any;
  private likes = false;

  private url = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(private router: Router, private mediaService: MediaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getParams();
    console.log(this.fileid);

    this.getFile(this.fileid);
    this.getFavorites(this.fileid);



  }


  getParams = () => {
    this.route.params.subscribe((params: any) => {
      console.log(params.fileid);
      this.fileid = params.fileid;
    }
    );
  }

  getFile = (filen: any) => {
    this.mediaService.getMediaFile(filen).subscribe(
      res => {
        console.log(res);
        this.file = res;
        this.getUsername(this.file.user_id);
      }
    );
  }

  getUsername = (user: any) => {
    this.mediaService.getUserInfo(user).subscribe(
      respon => {
        console.log(respon);
        this.user = respon;
      }
    );
  }

  getFavorites = (fileid: any) => {
    this.mediaService.getFavorites(fileid).subscribe(
      resp => {
        this.favorite = resp.json();
        console.log(this.favorite);
        this.checkIfLiked();

      }
    );
  }

  checkIfLiked(){
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    for (let like of this.favorite) {
      if (user.user_id == like.user_id) {
        this.likes = true;
      }

    }
  }

  likeMedia() {
    this.mediaService.likeMedia(this.fileid).subscribe(
      resp => {
      console.log(resp.json());
      console.log("liked!");
    });
  }

  dislikeMedia() {
    this.mediaService.dislikeMedia(this.fileid).subscribe(
      resp => {
      console.log(resp.json());
    });
  }



}
