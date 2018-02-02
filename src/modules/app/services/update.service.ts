import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UpdateService {
    private _subscription: Subscription;

    constructor(private _swUpdate: SwUpdate) {
    }

    public register(): void {
        this._subscription = this._swUpdate.available.subscribe(() => console.log('update available'));
    }

    public unregister(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
