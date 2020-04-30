import { Injectable, EventEmitter } from '@angular/core';

interface BroadcastEvent {
  key: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class Broadcaster {
  private _eventBus: EventEmitter<BroadcastEvent>;

  constructor() {
    this._eventBus = new EventEmitter<BroadcastEvent>();
  }

  public broadcast(key: any, data?: any): void {
    this._eventBus.emit({key: key, data: data});
  }

  public subscribe(key: string, callback: any): void{
    this._eventBus.subscribe(_event => {
      if(_event&&_event.key==key) {
        callback(_event.data);
      }
    });
  }
}