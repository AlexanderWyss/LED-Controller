import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PatternPage } from './pattern.page';
import {PatternSettingsModule} from '../pattern-settings/pattern-settings.module';

const routes: Routes = [
  {
    path: '',
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
export class PatternPageModule {}
