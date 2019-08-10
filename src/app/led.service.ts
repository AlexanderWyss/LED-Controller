import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Pattern} from './pattern.service';
import {ComService} from './com.service';
import {HttpComService} from './http-com.service';
import {BleComService} from './ble-com.service';
import {Platform} from '@ionic/angular';

export interface SerialPort {
    comName: string;
    manufacturer?: string;
    serialNumber?: string;
    pnpId?: string;
    locationId?: string;
    productId?: string;
    vendorId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class LEDService {

    private selectedPort: string;
    private numberOfLeds = 13;
    private pin = '2';

    BASE = '/api/';

    private com: ComService;

    constructor(private httpCom: HttpComService, private bleCom: BleComService, private plt: Platform) {
        if (plt.is('cordova')) {
            this.com = bleCom;
        } else {
            this.com = httpCom;
        }
    }

    public start(name: string) {
        this.com.write(this.BASE + 'start', {pattern: name});
    }

    public stop() {
        this.com.read(this.BASE + 'stop');
    }

    public allOff() {
        this.com.read(this.BASE + 'alloff');
    }

    public save(pattern: Pattern) {
        const data = {pattern: pattern.name};
        for (const patternSetting of pattern.patternSettings) {
            console.log(patternSetting.value.toString());
            data[patternSetting.name] = patternSetting.value.toString();
        }
        this.com.write(this.BASE + 'options', data);
    }

    public setNumberOfLeds(leds: number) {
        this.numberOfLeds = leds;
        this.com.write(this.BASE + 'options/leds/set', {leds: leds.toString()});
    }

    public getNumberOfLeds(): number {
        return this.numberOfLeds;
    }

    public setPin(pin: string) {
        this.pin = pin;
        this.com.write(this.BASE + 'options/pin/set', {pin});
    }

    public getPin(): string {
        return this.pin;
    }

    public getSerialports(): Promise<SerialPort[]> {
        return this.com.read(this.BASE + 'serialport/get').then((result: any) => result.serialports);
    }

    public setSerialport(port: string) {
        this.selectedPort = port;
        this.com.write(this.BASE + 'serialport/set', {name: port});
    }

    public getSelectedPort() {
        return this.selectedPort;
    }
}
