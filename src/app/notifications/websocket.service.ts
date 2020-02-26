import {Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';

@Injectable()
export class WebsocketService {
  socket: WebSocketSubject<any>;

  getSocket(): Observable<any> {
    this.socket = webSocket({
      url: 'ws://localhost:8080/notifications',
      deserializer: msg => msg.data
    });

    return this.socket;
  }
}
