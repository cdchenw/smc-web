import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToastService } from 'src/app/components/toasts/toast.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SMC_CONSTANTS } from 'src/app/common';

@Component({
  selector: 'admin-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
  loadingShown: boolean;
  fileList: FileList;

  constructor(
    private _router: Router,
    private _loadingService: LoadingService,
    private _toastService: ToastService,
    private _fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  handleFileSelect(fileList: FileList): void{
    this.fileList = fileList;
  }

  handleUpload(): void{
    this._loadingService.show();
    this._fileUploadService.postFile(this.fileList[0])
    .pipe(finalize(()=>{
      this._loadingService.hide();
    }))
    .subscribe(data=>{
      console.log("upload successfully");
      this._toastService.showSuccess("Import data successfully.");
      sessionStorage.setItem(SMC_CONSTANTS.IMPORT_RESULT_REPORT, JSON.stringify(data));
      this._router.navigateByUrl("/import-success");
    }, error=>{
      console.log("upload failed! ", error);
      this._toastService.showError("Import data failed!");
    });
  }

}
