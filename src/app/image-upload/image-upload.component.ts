import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, Observer } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AppComponent } from '../app.component';
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

  locationErrorRS = "Molimo vas da uključite lokaciju i osvežite stranicu!<br>Ukoliko i dalje ne možete da kliknete dugme SLIKAJ, proverite da li je ovom sajtu dozvoljen pristup lokaciji i kameri.";
  locationErrorEN = "Please turn on your location and refresh the page!<br>If you are still unable to click the TAKE PHOTO button, check if this website has access to your location and camera.";

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
        if (this.getLanguage === 'rs') {
          window.alert("Molimo vas da uključite lokaciju i osvežite stranicu!");
          ImageUploadComponent.message = this.locationErrorRS;
        } else {
          window.alert("Please turn on your location and refresh the page!");
          ImageUploadComponent.message = this.locationErrorEN;
        }
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
          ImageUploadComponent.message = "Nema slike! Ne obrađujemo ništa..."; // these don't really show up on the page
          return;
        }

        ImageUploadComponent.message = "Filtriramo sliku..."; // these don't really show up on the page
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
                  if (this.getLanguage === 'rs') {
                    window.alert("Nismo pronašli senzor blizu vaše lokacije!");
                  } else {
                    window.alert("We couldn't find a sensor near your location!");
                  }
                } else {
                  if (this.getLanguage === 'rs') {
                    window.alert("Došlo je do greške sa naše strane! Molimo vas da osvežite stranicu i pokušate ponovo!");
                  } else {
                    window.alert("Something went wrong on our side! Please refresh the page and try again!");
                  }
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

  get getLanguage() {
    return AppComponent.language;
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
