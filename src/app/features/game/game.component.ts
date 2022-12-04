import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, catchError, EMPTY, map, Observable, of, retryWhen, switchMap, takeUntil, tap, throwError, zip } from 'rxjs';

import { PlayerScore } from '../../interfaces/player-score.interface';
import { Player } from '../../enums/player.enum';
import { Resource } from '../../enums/resource.enum';
import { PlayerConfiguration } from '../../interfaces/player-configuration.interface';
import { GameFormControl } from '../../enums/game-form-control.enum';
import { GameService } from '../../services/game.service';
import { Destroyable } from '../../utils/destroyable.util';
import { SelectedResource } from './types/selected-resource.type';
import { ViewState } from './components/card/enums/view-state.enum';
import { ResultsPopupComponent } from './components/results-popup/results-popup.component';
import { Result } from '../../enums/result.enum';
import { SwapiResourceResponse } from '../../interfaces/swapi-resource-response.interface';
import { SwapiResponse } from '../../interfaces/swapi-response.interface';

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
    public yourCardHeading: string = 'Your card';
    public enemyCardHeading: string = 'Enemy card';
    public showResultsButtonText: string = 'Show results';

    public get playerImageSource(): string {
        return this.playerConfiguration?.[GameFormControl.PLAYER] === Player.PLAYER_ONE ? 'assets/images/png/player-one.png' : 'assets/images/png/player-two.png';
    }

    public get enemyImageSource(): string {
        return this.playerConfiguration?.[GameFormControl.RESOURCE] === Resource.PEOPLE ? 'assets/images/png/enemy.png' : 'assets/images/png/enemy-starship.png';
    }

    constructor(private gameService: GameService, private httpClient: HttpClient, private dialog: MatDialog) {
        super();
    }

    public ngOnInit(): void {
        this.playerConfiguration = this.gameService.playerConfiguration;
        this.gameService.shouldPlayGame.pipe(takeUntil(this.destroyed$)).subscribe(() => this.getDataForResources());
    }

    public showResults(): void {
        this.dialog.open(ResultsPopupComponent, {
            panelClass: 'results-popup-panel-class',
        });
    }

    private getDataForResources(): void {
        this.viewState = ViewState.LOADING;

        if (this.getTotalRecords()) {
            zip(this.getDataForResource$(), this.getDataForResource$())
                .pipe(takeUntil(this.destroyed$))
                .subscribe((selectedResources: [SelectedResource, SelectedResource]) => this.setDataForResources(selectedResources[0], selectedResources[1]));

            return;
        }

        this.httpClient
            .get<SwapiResponse>(this.setUrlForApiCall())
            .pipe(
                catchError(() => {
                    this.viewState = ViewState.ERROR;

                    return EMPTY;
                }),
                tap((response: SwapiResponse) => this.setTotalRecords(response.total_records)),
                switchMap(() => zip(this.getDataForResource$(), this.getDataForResource$())),
                takeUntil(this.destroyed$)
            )
            .subscribe((selectedResources: [SelectedResource, SelectedResource]) => this.setDataForResources(selectedResources[0], selectedResources[1]));
    }

    private setDataForResources(playerData: SelectedResource, enemyData: SelectedResource): void {
        this.player$ = of(playerData);
        this.enemy$ = of(enemyData);

        const playerAttributeValue: number = this.getAttribute(playerData);
        const enemyAttributeValue: number = this.getAttribute(enemyData);

        this.getResults(playerAttributeValue, enemyAttributeValue);

        this.viewState = ViewState.SUCCESS;
    }

    private getResults(playerAttributeValue: number, enemyAttributeValue: number): void {
        if (isNaN(playerAttributeValue)) {
            playerAttributeValue = 0;
        }

        if (isNaN(enemyAttributeValue)) {
            enemyAttributeValue = 0;
        }

        const player$: BehaviorSubject<PlayerScore> = this.gameService.getPlayer$();
        const playersValue: PlayerScore = player$.getValue();

        switch (true) {
            case playerAttributeValue > enemyAttributeValue:
                const win: PlayerScore = {
                    wins: (playersValue.wins += 1),
                    ...playersValue,
                };

                this.setCurrentResult(player$, win, Result.WIN);

                return;
            case playerAttributeValue === enemyAttributeValue:
                const draw: PlayerScore = {
                    draws: (playersValue.draws += 1),
                    ...playersValue,
                };

                this.setCurrentResult(player$, draw, Result.DRAW);

                return;
            case playerAttributeValue < enemyAttributeValue:
                const lose: PlayerScore = {
                    loses: (playersValue.loses += 1),
                    ...playersValue,
                };

                this.setCurrentResult(player$, lose, Result.LOSE);

                return;
        }
    }

    private setCurrentResult(player$: BehaviorSubject<PlayerScore>, score: PlayerScore, result: Result): void {
        player$.next(score);

        this.gameService.currentResult = result;
    }

    private getAttribute(resource: SelectedResource): number {
        const selectedAttribute: keyof SelectedResource = this.playerConfiguration?.[GameFormControl.ATTRIBUTE].toLowerCase() as keyof SelectedResource;

        return +resource?.[selectedAttribute];
    }

    private getDataForResource$(): Observable<SelectedResource> {
        let randomNumber: number = this.getRandomNumber(this.getTotalRecords());

        return of(this.setUrlForApiCall()).pipe(
            switchMap((url: string) => this.httpClient.get<SwapiResourceResponse>(url + '/' + randomNumber)),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404 && error?.error?.message.includes('not found')) {
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
                        if (error.status === 404 && error?.error?.message.includes('not found')) {
                            randomNumber = this.getRandomNumber(this.getTotalRecords());

                            return of(null);
                        }

                        return throwError(() => error);
                    })
                )
            ),
            map((response: SwapiResourceResponse) => response?.result?.properties),
            takeUntil(this.destroyed$)
        );
    }

    private setUrlForApiCall(): string {
        const resource: string = this.getSelectedResource()?.toLowerCase();

        return `https://swapi.tech/api/${resource}`;
    }

    private getSelectedResource(): Resource {
        return this.gameService.playerConfiguration?.[GameFormControl.RESOURCE];
    }

    private getTotalRecords(): number {
        return this.getSelectedResource() === Resource.PEOPLE ? this.gameService.totalPeopleRecords : this.gameService.totalStarshipsRecords;
    }

    private setTotalRecords(totalRecords: number): void {
        const selectedResource: Resource = this.getSelectedResource();

        switch (selectedResource) {
            case Resource.PEOPLE:
                this.gameService.totalPeopleRecords = totalRecords;

                return;
            case Resource.STARSHIPS:
                this.gameService.totalStarshipsRecords = totalRecords;

                return;
        }
    }

    private getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }
}
