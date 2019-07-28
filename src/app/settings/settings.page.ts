import {Component, OnInit} from '@angular/core';
import {LEDService, SerialPort} from '../led.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    private serialports: SerialPort[];
    private selectedPort;
    private numberOfLeds: number;
    private pin: string;
    pins = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

    constructor(private ledService: LEDService) {
    }

    ngOnInit() {
        this.initPort();
        this.numberOfLeds = this.ledService.getNumberOfLeds();
        this.pin = this.ledService.getPin();
    }

    private initPort() {
        this.ledService.getSerialports().then(serialports => this.serialports = serialports);
        if (this.ledService.getSelectedPort()) {
            this.selectedPort = this.ledService.getSelectedPort();
        } else {
            this.selectedPort = 'autoselect';
        }
    }

    setPort() {
        this.ledService.setSerialport(this.selectedPort);
    }

    setNumberOfLeds() {
        this.ledService.setNumberOfLeds(this.numberOfLeds);
    }

    setPin() {
        this.ledService.setPin(this.pin);
    }
}
