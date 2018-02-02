import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap, tap} from 'rxjs/operators';
import {AppStateService} from '../../../shared/services/appState.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    public onlineChange$: Observable<boolean>;
    public title: string;

    constructor(private _router: Router, private _route: ActivatedRoute, private _appStateService: AppStateService) {
      this.onlineChange$ = this._appStateService.onlineStateChange;
    }

    public ngOnInit(): void {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this._route),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                mergeMap((route) => route.data),
                tap(event => this.title = event.title)
            ).subscribe();

        this._appStateService.initialize();
    }

    public ngOnDestroy(): void {
        this._appStateService.dispose();
    }
}
