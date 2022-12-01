import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { catchError, EMPTY, Observable, of, retryWhen, switchMap, takeUntil, throwError, zip } from 'rxjs';

import { Player } from '../../enums/player.enum';
import { Resource } from '../../enums/resource.enum';
import { PlayerConfiguration } from './../../interfaces/player-configuration.interface';
import { GameFormControl } from './../../enums/game-form-control.enum';
import { GameService } from '../../services/game.service';
import { Destroyable } from '../../utils/destroyable.util';
import { SelectedResource } from './types/selected-resource.type';
import { ViewState } from './components/card/enums/view-state.enum';

@Component({
    selector: 'swapi-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent extends Destroyable implements OnInit {
    public player$: Observable<SelectedResource>;
    public enemy$: Observable<SelectedResource>;
    public playerConfiguration: PlayerConfiguration;
    public viewState: ViewState;
    public ViewState: typeof ViewState = ViewState;

    public get playerImageSource(): string {
        return this.playerConfiguration?.[GameFormControl.PLAYER] === Player.PLAYER_ONE ? 'assets/images/png/player-one.png' : 'assets/images/png/player-two.png';
    }

    public get enemyImageSource(): string {
        return this.playerConfiguration?.[GameFormControl.RESOURCE] === Resource.PEOPLE ? 'assets/images/png/enemy.png' : 'assets/images/png/enemy-starship.png';
    }

    constructor(private gameService: GameService, private httpClient: HttpClient) {
        super();
    }

    public ngOnInit(): void {
        this.playerConfiguration = this.gameService.playerConfiguration;
        this.getDataForResources();
    }

    public showResult(): void {
        // TODO
    }

    private getDataForResources(): void {
        this.viewState = ViewState.LOADING;

        zip(this.getDataForResource$(), this.getDataForResource$())
            .pipe(takeUntil(this.destroyed$))
            .subscribe((selectedResources: [SelectedResource, SelectedResource]) => {
                this.player$ = of(selectedResources[0]);
                this.enemy$ = of(selectedResources[1]);
                this.viewState = ViewState.SUCCESS;
            });
    }

    private getDataForResource$(): Observable<SelectedResource> {
        let randomNumber: number = this.getRandomNumber(100);

        return of(this.setUrlForApiCall()).pipe(
            switchMap((url: string) => this.httpClient.get<SelectedResource>(url + randomNumber)),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404 && error.error.detail.includes('Not found')) {
                    return throwError(() => error);
                }

                this.viewState = ViewState.ERROR;

                return EMPTY;
            }),
            // RetryWhen is deprecated but there aren't any proper solution to handle this case
            // eslint-disable-next-line deprecation/deprecation
            retryWhen((notifier: Observable<HttpErrorResponse>) =>
                notifier.pipe(
                    switchMap((error: HttpErrorResponse) => {
                        if (error.status === 404 && error.error.detail.includes('Not found')) {
                            randomNumber = this.getRandomNumber(100);

                            return of(null);
                        }

                        return throwError(() => error);
                    })
                )
            )
        );
    }

    private setUrlForApiCall(): string {
        const resource: string = this.gameService.playerConfiguration?.[GameFormControl.RESOURCE].toLowerCase();

        return `https://swapi.dev/api/${resource}/`;
    }

    private getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }
}
