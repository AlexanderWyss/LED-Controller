import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {PatternSettingsModule} from './pattern-settings/pattern-settings.module';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BLE} from '@ionic-native/ble/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        PatternSettingsModule,
        ColorPickerModule,
        NoopAnimationsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        BLE

    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
