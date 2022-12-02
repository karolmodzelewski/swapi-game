import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Player } from '../../enums/player.enum';
import { Attribute } from '../../enums/attribute.enum';
import { Resource } from '../../enums/resource.enum';
import { GameFormControl } from '../../enums/game-form-control.enum';
import { GameService } from '../../services/game.service';
import { GameComponent } from './game.component';
import { GameModule } from './game.module';
import { ViewState } from './components/card/enums/view-state.enum';
import { ResultsPopupComponent } from './components/results-popup/results-popup.component';

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    let debugElement: DebugElement;
    let gameService: GameService;
    let dialog: MatDialog;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GameComponent],
            imports: [GameModule, HttpClientTestingModule],
            providers: [GameService],
        }).compileComponents();

        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        gameService = TestBed.inject(GameService);
        dialog = TestBed.inject(MatDialog);

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    describe('Template', () => {
        it(`Should render 2 'swapi-card' components in section and 'swapi-wide-button' component if ViewState equals SUCCESS`, () => {
            component.viewState = ViewState.SUCCESS;

            fixture.detectChanges();

            const swapiCardComponents: DebugElement[] = debugElement.queryAll(By.css('.section swapi-card'));
            const swapiWideButtonsComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-wide-button'));
            const swapiLoadingStateComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-loading-state'));
            const swapiErrorStateComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-error-state'));

            expect(swapiCardComponents.length).withContext(`Should render only 2 'swapi-card' components`).toEqual(2);
            expect(swapiWideButtonsComponents.length).withContext(`Should render only 1 'swapi-wide-button' components`).toEqual(1);
            expect(swapiLoadingStateComponents.length).withContext(`Should render 0 'swapi-loading-state' components`).toEqual(0);
            expect(swapiErrorStateComponents.length).withContext(`Should render 0 'swapi-error-state' components`).toEqual(0);
        });

        it(`Should only render 1 'swapi-loading-state' component if ViewState equals LOADING`, () => {
            component.viewState = ViewState.LOADING;

            fixture.detectChanges();

            const swapiCardComponents: DebugElement[] = debugElement.queryAll(By.css('.section swapi-card'));
            const swapiWideButtonsComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-wide-button'));
            const swapiLoadingStateComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-loading-state'));
            const swapiErrorStateComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-error-state'));

            expect(swapiCardComponents.length).withContext(`Should render 0 'swapi-card' components`).toEqual(0);
            expect(swapiWideButtonsComponents.length).withContext(`Should render 0 'swapi-wide-button' components`).toEqual(0);
            expect(swapiLoadingStateComponents.length).withContext(`Should render only 1 'swapi-loading-state' components`).toEqual(1);
            expect(swapiErrorStateComponents.length).withContext(`Should render 0 'swapi-error-state' components`).toEqual(0);
        });

        it(`Should only render 1 'swapi-error-state' component if ViewState equals ERROR`, () => {
            component.viewState = ViewState.ERROR;

            fixture.detectChanges();

            const swapiCardComponents: DebugElement[] = debugElement.queryAll(By.css('.section swapi-card'));
            const swapiWideButtonsComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-wide-button'));
            const swapiLoadingStateComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-loading-state'));
            const swapiErrorStateComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-error-state'));

            expect(swapiCardComponents.length).withContext(`Should render 0 'swapi-card' components`).toEqual(0);
            expect(swapiWideButtonsComponents.length).withContext(`Should render 0 'swapi-wide-button' components`).toEqual(0);
            expect(swapiLoadingStateComponents.length).withContext(`Should render 0 'swapi-loading-state' components`).toEqual(0);
            expect(swapiErrorStateComponents.length).withContext(`Should render only 1 'swapi-error-state' components`).toEqual(1);
        });
    });

    describe(`Component's logic`, () => {
        describe('ngOnInit method', () => {
            it(`Should get 'playerConfiguration' from 'GameService'`, () => {
                gameService.playerConfiguration = {
                    [GameFormControl.RESOURCE]: Resource.STARSHIPS,
                    [GameFormControl.ATTRIBUTE]: Attribute.COST_IN_CREDITS,
                    [GameFormControl.PLAYER]: Player.PLAYER_ONE,
                };

                component.ngOnInit();

                expect(component.playerConfiguration).withContext(`'PlayerConfiguration' should equal 'playerConfiguration' from 'GameService'`).toEqual(gameService.playerConfiguration);
            });

            it(`Should call 'playGame' method from 'GameService`, () => {
                spyOn(gameService, 'playGame');

                component.ngOnInit();

                expect(gameService.playGame).withContext(`Should call 'playGame' method from 'GameService`).toHaveBeenCalled();
            });
        });

        describe('showResults method', () => {
            it(`Should open dialog with panel-class and 'ResultsPopupComponent' component`, () => {
                const panelClass: string = 'results-popup-panel-class';

                spyOn(dialog, 'open');

                component.showResults();

                expect(dialog.open).toHaveBeenCalledWith(ResultsPopupComponent, { panelClass });
            });
        });
    });
});
