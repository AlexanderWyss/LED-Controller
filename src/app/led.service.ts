import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Pattern} from './pattern.service';
import {ComService} from './com.service';

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

    constructor(private com: ComService) {
    }

    public start(name: string) {
        const param = new HttpParams()
            .set('pattern', name);
        this.com.get(this.BASE + 'start', param);
    }

    public stop() {
        this.com.get(this.BASE + 'stop');
    }

    public allOff() {
        this.com.get(this.BASE + 'alloff');
    }

    public save(pattern: Pattern) {
        let param = new HttpParams()
            .set('pattern', pattern.name);
        for (const patternSetting of pattern.patternSettings) {
            console.log(patternSetting.value.toString());
            param = param.set(patternSetting.name, patternSetting.value.toString());
        }
        this.com.get(this.BASE + 'options', param);
    }

    public setNumberOfLeds(leds: number) {
        this.numberOfLeds = leds;
        const param = new HttpParams()
            .set('leds', leds.toString());
        this.com.get(this.BASE + 'options/leds/set', param);
    }

    public getNumberOfLeds(): number {
        return this.numberOfLeds;
    }

    public setPin(pin: string) {
        this.pin = pin;
        const param = new HttpParams()
            .set('pin', pin);
        this.com.get(this.BASE + 'options/pin/set', param);
    }

    public getPin(): string {
        return this.pin;
    }

    public getSerialports(): Promise<SerialPort[]> {
        return this.com.get(this.BASE + 'serialport/get').then((result: any) => result.serialports);
    }

    public setSerialport(name: string) {
        this.selectedPort = name;
        const param = new HttpParams()
            .set('name', name);
        this.com.get(this.BASE + 'serialport/set', param);
    }

    public getSelectedPort() {
        return this.selectedPort;
    }
}
