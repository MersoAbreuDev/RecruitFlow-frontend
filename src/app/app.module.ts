import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentModule } from './component/component.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
   
    MessageService],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
