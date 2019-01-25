import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PollService } from './models/poll.service';

import * as SocketConfig from './socket.config';

const config: SocketIoConfig = { url: SocketConfig.socketURL, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
