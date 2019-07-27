import {Injectable} from '@angular/core';

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
}

@Injectable({
    providedIn: 'root'
})
export class PatternService {
    public patterns: Pattern[] = [
        {
            name: 'wave',
            text: 'Wave',
            patternSettings: [{
                title: 'Size',
                name: 'size',
                value: 0,
                type: 'slider'
            }, {
                title: 'Speed',
                name: 'speed',
                value: 20,
                type: 'slider'
            }, {
                title: 'Return',
                name: 'return',
                value: 40,
                type: 'slider'
            }]
        }, {
            name: 'rainbow',
            text: 'Rainbow Cycle',
            patternSettings: [{
                title: 'Speed',
                name: 'speed',
                value: 20,
                type: 'slider'
            }]
        }, {
            name: 'rider',
            text: 'Color Rider',
            patternSettings: [{
              title: 'Speed',
              name: 'speed',
              value: 100,
              type: 'slider'
            }, {
              title: 'Length',
              name: 'length',
              value: 3,
              type: 'slider'
            }]
        }, {
            name: 'strobe',
            text: 'Strobe',
            patternSettings: [{
              title: 'Number of Flashes',
              name: 'numberOfFlashes',
              value: 100,
              type: 'slider'
            }, {
              title: 'Flash Delay',
              name: 'flashDelay',
              value: 25,
              type: 'slider'
            }, {
              title: 'End Delay',
              name: 'endDelay',
              value: 1000,
              type: 'slider'
            }]
        }, {
            name: 'running',
            text: 'Running Light',
            patternSettings: [{
              title: 'Speed',
              name: 'speed',
              value: 100,
              type: 'slider'
            }]
        }, {
            name: 'chase',
            text: 'Rainbow Chase',
            patternSettings: [{
              title: 'Speed',
              name: 'speed',
              value: 50,
              type: 'slider'
            }]
        }, {
            name: 'sparkle',
            text: 'Rainbow Sparkle',
            patternSettings: [{
              title: 'Delay',
              name: 'delay',
              value: 50,
              type: 'slider'
            }]
        }
    ];
}
