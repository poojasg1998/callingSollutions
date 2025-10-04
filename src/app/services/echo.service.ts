import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import io from 'socket.io-client';
(window as any).io = io;

@Injectable({
  providedIn: 'root',
})
export class EchoService {
  echo: Echo;
  socket: any;

  constructor() {
    this.initEcho();
  }

  private initEcho() {
    this.echo = new Echo({
      broadcaster: 'socket.io',
      // This is the correct host for the Socket.IO server
      host: 'https://chat.right2shout.in:6001',
      transports: ['websocket'],
      forceTLS: true,
      pingInterval: 25000,
      pingTimeout: 60000,

      // These options will be passed to the underlying socket.io-client
    });

    this.socket = this.echo.connector.socket;
    console.log(this.socket);
    this.socket.on('connect', () => {
      console.log('%c[Socket.IO] Connected', 'color: green');
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('%c[Socket.IO] Disconnected:', 'color: red', reason);
    });

    this.socket.on('reconnect_attempt', () => {
      console.log('%c[Socket.IO] Attempting to reconnect...', 'color: orange');
    });

    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log(
        '%c[Socket.IO] Reconnected after attempts:',
        'color: green',
        attemptNumber
      );
    });

    this.socket.on('reconnect_error', (error: any) => {
      console.log('%c[Socket.IO] Reconnect error:', 'color: red', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('%c[Socket.IO] Reconnect failed', 'color: darkred');
    });
  }

  listenToChannel(
    channel: string,
    event: string,
    callback: (data: any) => void
  ) {
    this.echo.channel(channel).listen(event, (data: any) => {
      const userid = localStorage.getItem('UserId');
      if (
        userid == data.Executive &&
        (data.Call_status == 'Call Disconnected' ||
          data.Call_status == 'Call Connected')
      ) {
        if (data.Call_status == 'Call Disconnected') {
          localStorage.removeItem('isOnCall');
        } else if (data.Call_status == 'Call Connected') {
          localStorage.setItem('isOnCall', 'true');
        }
        callback(data);
        return;
      }
    });
  }
}
