import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timestamp} from 'rxjs';
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

        var unix_time = Math.round(+new Date()/1000);
        var timestamp = this.convert_time(unix_time);

        formData.append("timestamp", timestamp.toString());

        return this.http.post(AppComponent.baseUrl, formData, {responseType: 'text'})
    }

    convert_time (unix_time) {
        var epoch = (unix_time * 1000);
        var date = new Date();
        var localOffset = (-1) * date.getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(epoch + localOffset).getTime());
        return stamp;
    }
}