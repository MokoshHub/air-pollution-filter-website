import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileDownloadService } from '../services/file-download.service';
import { saveAs } from 'file-saver';
import 'img-comparison-slider';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {
  image: any;
  originalImage: any;

  filename: string;
  imageUrl: string;

  isImageLoading: boolean;
  showInfo: boolean = false;
  noImage: boolean = false;
  
  constructor(private fileDownloadService: FileDownloadService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filename = params['id'];
      this.getImageFromService(this.filename);
    });
  }

  get getLanguage() {
    return AppComponent.language;
  }

  getImageFromService(filename) {
    this.isImageLoading = true;
    this.fileDownloadService.download(filename).subscribe(async data => {
      var resultImages = data['result'];

      if (resultImages.length == 0) {
        this.noImage = true;
        this.router.navigate(['/']);
      } else {
        var base64ResponseImage = await fetch(`data:image/${AppComponent.imageType};base64,${resultImages[0]}`);
        var base64ResponseOriginal = await fetch(`data:image/${AppComponent.imageType};base64,${resultImages[1]}`);

        this.createImageFromBlob(await base64ResponseImage.blob(), false);
        this.createImageFromBlob(await base64ResponseOriginal.blob(), true);
      }
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob, original: boolean) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (original) {
        this.originalImage = reader.result;
      } else {
        this.image = reader.result;
      }
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
    
    this.isImageLoading = false;
  }

  downloadImage(imageUrl){
    saveAs(imageUrl);
  }
}
