import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'admin-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
  loadingShown: boolean;

  constructor(private _fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  handleFileSelect(fileList: FileList): void{
    console.log("files:", fileList);
    this.loadingShown = true;
    this._fileUploadService.postFile(fileList[0]).subscribe(data=>{
      console.log("upload successfully");
      this.loadingShown = false;
    }, error=>{
      console.log("upload failed! ", error);
      this.loadingShown = false;
    });
  }

}
