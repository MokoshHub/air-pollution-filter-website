import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamComponent } from './webcam/webcam.component';
import { MobileCameraComponent } from './mobile-camera/mobile-camera.component';

@NgModule({
  declarations: [WebcamComponent, MobileCameraComponent],
  imports: [
    CommonModule
  ],
  exports: [WebcamComponent, MobileCameraComponent]
})
export class CapturePhotoModule { }