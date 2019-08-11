import {Injectable} from "@angular/core";
import {BLE} from "@ionic-native/ble/ngx";
import * as uuidGen from "uuid/v5";
import {ComService} from "./com.service";

@Injectable({
  providedIn: "root"
})
export class BleComService extends ComService {
  protected uuid = "de7daa74-9126-494c-b277-9ca4c0944c7e";
  private id: string;

  constructor(private ble: BLE) {
    super("ble");
  }

  write(name: string, data: object): Promise<object> {
    const json = JSON.stringify(data);
    console.log("BLE: Write: " + name + " " + json);
    return this.ble.write(
      this.id,
      this.uuid,
      this.getUuid(name),
      new TextEncoder().encode(json).buffer as ArrayBuffer
    );
  }

  read(name: string): Promise<void> {
    console.log("BLE: Write: " + name);
    return this.ble.read(
      this.id,
      this.uuid,
      this.getUuid(name)
    ).then(result => {
      return JSON.parse(new TextDecoder().decode(new Uint8Array(result)));
    });
  }

  private getUuid(name: string) {
    return uuidGen(name, this.uuid);
  }

  public autoConnect() {
    console.log("BLE Start scan");
    this.ble.startScan([this.uuid]).subscribe(result => {
      this.ble.autoConnect(result.id, (status) => {
        this.id = result.id;
        console.log("BLE Connected: " + result.id);
      }, () => {
        this.id = null;
        console.log("BLE Disconnected: " + result.id);
      });
    });
  }

  public disconnect() {
    this.ble.stopScan().then(v => console.log("BLE stop"));
    this.ble.disconnect(this.id).then(v => console.log("BLE Disconnect"));
  }
}
