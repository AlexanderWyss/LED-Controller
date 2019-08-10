import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import * as uuidGen from 'uuid/v5';
import {BLE} from '@ionic-native/ble/ngx';

@Injectable({
    providedIn: 'root'
})
export class ComService {
    private uuid = 'de7daa74-9126-494c-b277-9ca4c0944c7e';
    private id: string;

    constructor(private http: HttpClient, public ble: BLE, public plt: Platform) {
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

    get(name: string, params?: HttpParams): Promise<any> {
        console.log('Get: ' + name);
        if (this.plt.is('cordova')) {
            if (this.id != null) {
                const characteristicUuid = uuidGen(name, this.uuid);
                if (params === undefined || params.keys().length === 0) {
                    return this.ble.read(
                        this.id,
                        this.uuid,
                        characteristicUuid
                    ).then(result => {
                        const asText = new TextDecoder().decode(new Uint8Array(result));
                        console.log(asText);
                        return JSON.parse(asText);
                    });
                } else {
                    const data = {};
                    for (const key of params.keys()) {
                        data[key] = params.get(key);
                    }
                    return this.ble.write(
                        this.id,
                        this.uuid,
                        characteristicUuid,
                        new TextEncoder().encode(JSON.stringify(data)).buffer as ArrayBuffer
                    );
                }
                return Promise.all([]);
            } else {
                console.log('BLE not connected');
            }
        } else {
            return this.http.get(name, {params}).toPromise();
        }
    }
}
