import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SMC_API } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _httpClient: HttpClient) { }

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this._httpClient.post(SMC_API.IMPORT_DATA, formData);
  }
}
