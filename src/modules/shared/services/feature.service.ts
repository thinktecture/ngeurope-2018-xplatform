import {Inject, Injectable} from '@angular/core';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import {BrowserFeature} from '../models/browserFeature.model';
import {detect} from 'detect-browser';
import {WINDOW} from './window.token';

@Injectable()
export class FeatureService {
    private _nav: Navigator;
    private _browser: any;

    private _features: any;

    constructor(@Inject(WINDOW) private _window: Window) {
        this._nav = this._window.navigator;
        this._browser = detect();

        this._features = {
            [BrowserFeatureKey.ServiceWorker]: 'serviceWorker' in this._window.navigator,
            [BrowserFeatureKey.MediaDevices]: 'mediaDevices' in this._nav && 'getUserMedia' in this._nav.mediaDevices,
        };
    }

    public detectFeatures(): Array<BrowserFeature> {
        return Object.keys(this._features).map(key => new BrowserFeature(key, this._features[key]));
    }

    public detectFeature(feature: BrowserFeatureKey): BrowserFeature {
        return new BrowserFeature(feature, this._features[feature]);
    }

    public getBrowserName() {
        return this._browser.name;
    }

    public getBrowserVersion() {
        return this._browser.version;
    }
}
