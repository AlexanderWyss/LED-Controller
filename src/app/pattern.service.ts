import {Injectable} from "@angular/core";
import {LEDService} from "./led.service";

export interface Pattern {
  name: string;
  text: string;
  patternSettings: PatternSetting[];
}

export interface PatternSetting {
  title: string;
  name: string;
  value: any;
  type: string;
  maxValue?: number;
}

@Injectable({
  providedIn: "root"
})
export class PatternService {
  public patterns: Pattern[] = [
    {
      name: "neo",
      text: "Strip",
      patternSettings: [{
        title: "Color",
        name: "color",
        value: "#ffffff",
        type: "color"
      }]
    },
    {
      name: "wave",
      text: "Wave",
      patternSettings: [{
        title: "Size",
        name: "size",
        value: 0,
        type: "slider"
      }, {
        title: "Speed",
        name: "speed",
        value: 20,
        type: "slider"
      }, {
        title: "Return",
        name: "returnValue",
        value: 40,
        type: "slider"
      }, {
        title: "Color",
        name: "color",
        value: "#ffffff",
        type: "color"
      }]
    }, {
      name: "rainbow",
      text: "Rainbow Cycle",
      patternSettings: [{
        title: "Speed",
        name: "speed",
        value: 20,
        type: "slider"
      }]
    }, {
      name: "rider",
      text: "Color Rider",
      patternSettings: [{
        title: "Speed",
        name: "speed",
        value: 100,
        type: "slider"
      }, {
        title: "Length",
        name: "length",
        value: 3,
        type: "slider"
      }]
    }, {
      name: "strobe",
      text: "Strobe",
      patternSettings: [{
        title: "Number of Flashes",
        name: "numberOfFlashes",
        value: 100,
        type: "slider"
      }, {
        title: "Flash Delay",
        name: "flashDelay",
        value: 25,
        type: "slider"
      }, {
        title: "End Delay",
        name: "endDelay",
        value: 1000,
        type: "slider"
      }, {
        title: "Color",
        name: "color",
        value: "#ffffff",
        type: "color"
      }]
    }, {
      name: "running",
      text: "Running Light",
      patternSettings: [{
        title: "Speed",
        name: "speed",
        value: 100,
        type: "slider"
      }, {
        title: "Color",
        name: "color",
        value: "#ffffff",
        type: "color"
      }]
    }, {
      name: "chase",
      text: "Rainbow Chase",
      patternSettings: [{
        title: "Speed",
        name: "speed",
        value: 50,
        type: "slider"
      }]
    }, {
      name: "sparkle",
      text: "Rainbow Sparkle",
      patternSettings: [{
        title: "Delay",
        name: "delay",
        value: 50,
        type: "slider"
      }]
    }
  ];

  constructor(private ledService: LEDService) {
  }

  public refresh(): Promise<void> {
    return this.ledService.getNumberOfLeds().then(numberOfLeds => {
      this.setMaxValue("wave", "size", numberOfLeds);
      this.setMaxValue("rider", "length", numberOfLeds);
    });
  }

  private getPatternSetting(patternName: string, settingName: string) {
    return this.patterns.find(pattern => pattern.name === patternName).patternSettings.find(settings => settings.name === settingName);
  }

  private setMaxValue(patternName: string, settingName: string, maxValue: number) {
    const patternSetting = this.getPatternSetting(patternName, settingName);
    patternSetting.maxValue = maxValue;
    if (patternSetting.value > maxValue) {
      patternSetting.value = maxValue;
    }
  }
}
