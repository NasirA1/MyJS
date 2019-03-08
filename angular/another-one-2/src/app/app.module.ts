import { BrowserModule }                from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';
import { NgModule }                     from '@angular/core';

import {
  AppComponent,
  DynamicFormComponent,
  DynamicFormQuestionComponent,
  InlineEditableAny,
  ChildDirective
} from './app.component';


@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, DynamicFormComponent, DynamicFormQuestionComponent, InlineEditableAny, ChildDirective ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor() {
  }
}
