import {ModuleWithProviders, NgModule} from '@angular/core';
import {SHARED_SERVICES} from './services';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {_window, WINDOW} from './services/window.token';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
    ]
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ...SHARED_SERVICES,
                { provide: WINDOW, useFactory: _window }
            ],
        };
    }
}
