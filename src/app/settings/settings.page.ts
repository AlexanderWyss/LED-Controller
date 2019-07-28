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

    constructor(private ledService: LEDService) {
    }

    ngOnInit() {
        this.initPort();
        this.numberOfLeds = this.ledService.getNumberOfLeds();
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
}
