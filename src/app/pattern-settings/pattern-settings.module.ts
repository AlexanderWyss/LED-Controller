import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatternSettingsSliderComponent} from '../pattern-settings-slider/pattern-settings-slider.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [PatternSettingsSliderComponent],
  exports: [
      PatternSettingsSliderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class PatternSettingsModule { }
