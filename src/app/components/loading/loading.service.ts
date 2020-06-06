import { Injectable } from '@angular/core';
import { ToastService } from '../toasts/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  showLoading: boolean;

  constructor() { 
    this.showLoading = false;
  }

  show(){
    this.showLoading = true;
  }

  hide(){
    this.showLoading = false;
  }
}
