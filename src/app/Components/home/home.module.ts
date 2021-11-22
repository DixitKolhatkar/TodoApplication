import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
const sampleRoute:Routes =[{path:'',component:HomeComponent}];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(sampleRoute),
   
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class HomeModule {

}