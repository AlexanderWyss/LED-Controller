import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {ColorPickerModule} from "@iplab/ngx-color-picker";
import {PatternSettingsColorComponent} from "../pattern-settings-color/pattern-settings-color.component";
import {PatternSettingsSliderComponent} from "../pattern-settings-slider/pattern-settings-slider.component";

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
export class PatternSettingsModule {
}
