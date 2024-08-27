import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomePageComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    FormsModule
  ],
  exports: [
    HomePageComponent,
    ProfileComponent
  ]
})
export class HomeModule { }
