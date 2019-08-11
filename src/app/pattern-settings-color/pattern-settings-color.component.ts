import {Component, Input, OnInit} from "@angular/core";
import {ColorPickerControl} from "@iplab/ngx-color-picker";
import {PatternSetting} from "../pattern.service";

@Component({
  selector: "app-pattern-settings-color",
  templateUrl: "./pattern-settings-color.component.html",
  styleUrls: ["./pattern-settings-color.component.scss"],
})
export class PatternSettingsColorComponent implements OnInit {

  @Input() patternSetting: PatternSetting;
  control = new ColorPickerControl()
    .hideAlphaChannel();

  constructor() {
  }

  ngOnInit() {
  }
}
