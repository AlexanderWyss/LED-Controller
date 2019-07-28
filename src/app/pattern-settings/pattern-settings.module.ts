import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatternSettingsSliderComponent} from '../pattern-settings-slider/pattern-settings-slider.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {PatternSettingsColorComponent} from '../pattern-settings-color/pattern-settings-color.component';
import {ColorPickerModule} from '@iplab/ngx-color-picker';

@NgModule({
  declarations: [PatternSettingsSliderComponent, PatternSettingsColorComponent],
  exports: [
      PatternSettingsSliderComponent, PatternSettingsColorComponent
  ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ColorPickerModule
    ]
})
export class PatternSettingsModule { }
