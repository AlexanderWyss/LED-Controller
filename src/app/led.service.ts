import {Injectable} from "@angular/core";
import {ComProviderService} from "./com-provider.service";
import {ComService} from "./com.service";
import {Pattern} from "./pattern.service";
import {ToastService} from "./toast.service";

export interface PortInfo {
  serialports: string[];
  selectedPort: string;
}

@Injectable({
  providedIn: "root"
})
export class LEDService {

  BASE = "/api/";

  constructor(private comProvider: ComProviderService, private toast: ToastService) {
  }

  public start(name: string) {
    this.getCom().write(this.BASE + "start", {pattern: name})
      .catch(this.logError("starting " + name));
  }

  public stop() {
    this.getCom().read(this.BASE + "stop").catch(this.logError("stopping"));
  }

  public allOff() {
    this.getCom().read(this.BASE + "alloff").catch(this.logError("turning all off"));
  }

  public save(pattern: Pattern) {
    const data = {pattern: pattern.name};
    for (const patternSetting of pattern.patternSettings) {
      console.log(patternSetting.value.toString());
      data[patternSetting.name] = patternSetting.value.toString();
    }
    this.getCom().write(this.BASE + "options", data).catch(this.logError("saving " + pattern.name));
  }

  public setNumberOfLeds(leds: number) {
    this.getCom().write(this.BASE + "leds/set", {leds: leds.toString()}).catch(this.logError("setting Number of Leds"));
  }

  public getNumberOfLeds(): Promise<number> {
    return this.getCom().read(this.BASE + "leds/get").then(result => result.leds);
  }

  public setPin(pin: string) {
    this.getCom().write(this.BASE + "pin/set", {pin}).catch(this.logError("setting pin"));
  }

  public getPin(): Promise<string> {
    return this.getCom().read(this.BASE + "pin/get").then(result => result.pin);
  }

  public getSerialports(): Promise<PortInfo> {
    return this.getCom().read(this.BASE + "serialport/get");
  }

  public setSerialport(port: string) {
    this.getCom().write(this.BASE + "serialport/set", {name: port}).catch(this.logError("setting serialport"));
  }

  private getCom(): ComService {
    return this.comProvider.getCom();
  }

  private logError(action: string) {
    return error => {
      console.error(error);
      this.toast.error("Something went wrong while " + action);
    };
  }
}
