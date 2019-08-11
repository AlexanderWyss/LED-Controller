import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";
import {PatternSettingsModule} from "../pattern-settings/pattern-settings.module";

import {PatternPage} from "./pattern.page";

const routes: Routes = [
  {
    path: "",
    component: PatternPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PatternSettingsModule
  ],
  declarations: [PatternPage]
})
export class PatternPageModule {
}
