import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'smc-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() type?: string; //global; local;
  @Input() size?: string; //tbd?

  constructor(
    public _loadingService: LoadingService
  ) { 
    this.type = "global";
    this.size = "default";
  }

  ngOnInit(): void {
  }

}
