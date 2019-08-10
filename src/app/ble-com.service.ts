import {Injectable} from '@angular/core';
import {ComService} from './com.service';
import {BLE} from '@ionic-native/ble/ngx';
import {Platform} from '@ionic/angular';
import * as uuidGen from 'uuid/v5';

@Injectable({
  providedIn: 'root'
})
export class BleComService extends ComService{

  constructor(private ble: BLE, private plt: Platform) {
    super();
    this.plt.ready().then((readySource) => {
      if (this.plt.is('cordova')) {
        this.ble.startScan([this.uuid]).subscribe(result => {
          this.ble.autoConnect(result.id, (status) => {
            this.id = result.id;
            console.log('BLE Connected: ' + result.id);
          }, () => {
            this.id = null;
            console.log('BLE Disconnected: ' + result.id);
          });
        });
      }
    });
  }

  write(name: string, data: object): Promise<object> {
    const json = JSON.stringify(data);
    console.log('BLE: Write: ' + name + ' ' + json);
    return this.ble.write(
        this.id,
        this.uuid,
        this.getUuid(name),
        new TextEncoder().encode(json).buffer as ArrayBuffer
    );
  }

  read(name: string): Promise<void> {
    console.log('BLE: Write: ' + name);
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
}
