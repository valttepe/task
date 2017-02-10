import { MediaService } from './../services/media.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  
  constructor(private mediaService: MediaService) { }

  ngOnInit() {
  }
  upload = (event: any, value: any) => {
    const fileELement = event.target.querySelector('input[type=file]');
    const file = fileELement.files[0];

    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', value.title);
    fd.append('description', value.description);

    this.mediaService.postMedia(fd)
    .subscribe(
      data => {
        console.log(data);
      }
    );


  }

}
