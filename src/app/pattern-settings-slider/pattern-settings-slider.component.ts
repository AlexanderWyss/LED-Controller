import {Component, Input, OnInit} from '@angular/core';
import {PatternSetting} from '../pattern.service';

@Component({
  selector: 'app-pattern-settings-slider',
  templateUrl: './pattern-settings-slider.component.html',
  styleUrls: ['./pattern-settings-slider.component.scss'],
})
export class PatternSettingsSliderComponent implements OnInit {

  @Input() patternSetting: PatternSetting;

  constructor() { }

  ngOnInit() {}

}
