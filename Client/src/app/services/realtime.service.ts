import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import { ServerAddress } from '../routesAndUrls'

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor() { }
  private socket = io('http://localhost:3000');

  Emit(eventName, data) {
    this.socket.emit(eventName, data);
  }
  Listen(eventName: string) {
    return new Observable<any>(subscriber => {
      this.socket.on(eventName, data => {
        subscriber.next(data);
      })
    })
  }
}
