import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SMC_APIS } from '../common/api.config';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _httpClient: HttpClient) { }

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this._httpClient.post(SMC_APIS.importData, formData);
  }
}
