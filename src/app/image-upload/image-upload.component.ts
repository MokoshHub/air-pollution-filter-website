import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, Observer } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MobileCameraComponent } from '../capture-photo/mobile-camera/mobile-camera.component';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  uploading = false;
  located = false;
  static message: string;

  filename: string;
  static imageUrl: any;

  returnedImage: any;

  lon: any;
  lat: any;
  isImageLoading: boolean;

  constructor(
    private fileUploadService: FileUploadService, 
    private imageCompress: NgxImageCompressService,
    private router: Router
  ) {
    this.getPosition()
      .subscribe(pos => {
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
        ImageUploadComponent.message = '';
        this.located = true;
      }, 
      error => {
        window.alert("Molimo vas da uključite lokaciju i osvežite stranicu!");
        ImageUploadComponent.message = "Molimo vas da uključite lokaciju i osvežite stranicu!";
      }
    );
  };

  getPosition(): Observable<any> {
    return Observable.create((observer: Observer<GeolocationPosition>) => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => observer.error(error));
    });
  }

  onUpload(photoSource: HTMLInputElement) {
    const photoSourceObj = photoSource.files[0];

    if ( !!photoSourceObj ) {
      const reader = new FileReader();
      reader.readAsDataURL(photoSourceObj);
      
      reader.onload = (e) => {
        ImageUploadComponent.imageUrl = reader.result;

        if (this.getImageUrl === undefined)
        {
          ImageUploadComponent.message = "Nema slike! Ne obrađujemo ništa...";
          return;
        }

        ImageUploadComponent.message = "Filtriramo sliku...";
        this.uploading = true;

        this.filename = this.getRandomString(8);

        this.imageCompress
          .compressFile(this.getImageUrl, 0, 80, 80)
          .then(
            async (compressedImage) => {
              var smallerImage = await fetch(compressedImage);
              var smallerBlob = await smallerImage.blob();
              
              var smallerFile = new File([smallerBlob], this.filename);

              this.fileUploadService.upload(smallerFile, this.filename, this.lat, this.lon).subscribe((data) => {
                ImageUploadComponent.message = '';
                this.uploading = false;

                ImageUploadComponent.setImageUrl = undefined;
          
                this.router.navigate(['image/' + this.filename]);
              }, error => {
                if (error.status == 418) {
                  window.alert("Nismo pronašli senzor blizu vaše lokacije!");
                } else {
                  window.alert("Došlo je do greške sa naše strane! Molimo vas da osvežite stranicu i pokušate ponovo!");
                }
                
                ImageUploadComponent.message = '';
                this.uploading = false;
                return;
              });
            }
        );
        
      };
    }
  }

  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    return result;
  }

  get getMessage() {
    return ImageUploadComponent.message;
  }

  get getImageUrl() {
    return ImageUploadComponent.imageUrl;
  }

  static set setImageUrl(newImageUrl) {
    ImageUploadComponent.imageUrl = newImageUrl;
  }
}
