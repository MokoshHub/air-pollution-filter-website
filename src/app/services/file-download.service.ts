import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
providedIn: 'root'
})

export class FileDownloadService {
    constructor(private http: HttpClient) { }

    download(filename: string): Observable<Object> {
        return this.http.get(AppComponent.baseUrl + 'send_image/' + filename + '.' + AppComponent.imageType, { responseType: 'json' });
    }
}
