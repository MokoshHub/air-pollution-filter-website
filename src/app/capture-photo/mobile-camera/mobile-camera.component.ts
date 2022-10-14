import { Component, OnInit, DoCheck } from '@angular/core';
import { BehaviorSubject, noop, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators'
import { ImageUploadComponent } from 'src/app/image-upload/image-upload.component';

@Component({
  selector: 'mobile-camera',
  templateUrl: './mobile-camera.component.html',
  styleUrls: ['./mobile-camera.component.css']
})
export class MobileCameraComponent implements OnInit {

  selectAllPhotoStatus:boolean = false;
  static imageUrl: any;

  constructor() { }

  ngOnInit() {}

  static TakePhoto(photoSource: HTMLInputElement): Observable<any> {
    const photoSourceObj = photoSource.files[0];

    if ( !!photoSourceObj ) {
      const reader = new FileReader();
      reader.readAsDataURL(photoSourceObj);
      
      reader.onload = (e) => { 
        MobileCameraComponent.imageUrl = reader.result;
        // ImageUploadComponent.setImageUrl = MobileCameraComponent.imageUrl;
        return MobileCameraComponent.imageUrl;
      };
    }

    return undefined;
  }

  filePhotoHandler(photoSourceObj: File) {
    ImageUploadComponent.setImageUrl(photoSourceObj);
    // return photoSourceObj;
  }
}