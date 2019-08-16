import {Injectable} from "@angular/core";
import * as hashString from "object-hash";
import * as Otplib from "otplib";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private static readonly PREF_AUTH_KEY = "authKey";

  private hash: string;
  private observers = [] as (() => void)[];

  constructor(private preferences: PreferencesService) {
    this.preferences.get(AuthService.PREF_AUTH_KEY).then(key => this.setKey(key));
  }

  public setKey(key: string) {
    if (key) {
      this.hash = hashString(key);
    } else {
      this.hash = undefined;
    }
    for (const call of this.observers) {
      call();
    }
    this.preferences.set(AuthService.PREF_AUTH_KEY, key);
  }

  public getKey(): string {
    return this.hash;
  }

  public getToken(): string {
    if (this.hash) {
      return Otplib.totp.generate(this.hash);
    }
    return "";
  }

  onKeyChanged(call: () => void) {
    this.observers.push(call);
  }
}
