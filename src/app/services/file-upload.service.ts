import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
providedIn: 'root'
})

export class FileUploadService {
    constructor(private http: HttpClient) { }

    upload(file: File, filename: string, lat: any, lon: any): Observable<any> {
        const formData = new FormData();

        formData.append("file", file, filename + '.' + AppComponent.imageType);
        formData.append("lat", lat);
        formData.append("lon", lon);

        return this.http.post(AppComponent.baseUrl, formData, {responseType: 'text'})
    }
}
