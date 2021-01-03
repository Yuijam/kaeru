import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module';
import { CommonModule } from '@angular/common';
import { LineDesComponent } from './components/line-des/line-des.component';
import { ItemMsgListComponent } from './components/item-msg-list/item-msg-list.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IfDeviceDirective } from './directives/ifDevice/if-device.directive';
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { DataItemComponent } from './components/data-item/data-item.component';
import { DataListComponent } from './components/data-list/data-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LineDesComponent,
    ItemMsgListComponent,
    DatePickerComponent,
    IfDeviceDirective,
    HomeComponent,
    DataComponent,
    DateRangeComponent,
    DataItemComponent,
    DataListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
