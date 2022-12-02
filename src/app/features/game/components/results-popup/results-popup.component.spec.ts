import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { BehaviorSubject, of } from 'rxjs';

import { ResultsPopupComponent } from './results-popup.component';
import { GameModule } from '../../game.module';
import { GameService } from '../../../../services/game.service';
import { PlayerScore } from '../../../../interfaces/player-score.interface';
import { Result } from '../../../../enums/result.enum';

describe('ResultsPopupComponent', () => {
    let component: ResultsPopupComponent;
    let fixture: ComponentFixture<ResultsPopupComponent>;
    let debugElement: DebugElement;
    let gameService: GameService;
    let dialogRef: MatDialogRef<ResultsPopupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResultsPopupComponent],
            imports: [GameModule],
            providers: [GameService, { provide: MatDialogRef, useValue: { close: () => of() } }],
        }).compileComponents();

        fixture = TestBed.createComponent(ResultsPopupComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        gameService = TestBed.inject(GameService);
        dialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    describe('Template', () => {
        it(`Should render a heading for 'RESULT.WIN' scenario`, () => {
            component.currentResult = Result.WIN;

            fixture.detectChanges();

            const headings: DebugElement[] = debugElement.queryAll(By.css('h2.result'));
            const swapiResultHeadings: DebugElement[] = debugElement.queryAll(By.css('swapi-result-heading'));

            expect(headings.length).withContext(`Should be only 1 'result' heading`).toEqual(1);
            expect(swapiResultHeadings.length).withContext(`Should be only 1 'swapiResultHeadings' component`).toEqual(1);
            expect(headings[0].nativeElement.textContent).withContext(`Heading should contain 'You won!' text`).toContain('You won!');
        });

        it('Should render properly all statistics', () => {
            component.player$ = new BehaviorSubject<PlayerScore>({
                wins: 1,
                draws: 2,
                loses: 3,
            });

            fixture.detectChanges();

            const statistics: DebugElement[] = debugElement.queryAll(By.css('div.statistics .text'));

            expect(statistics.length).withContext(`Should be only 3 'statistics' paragraphs`).toEqual(3);

            const wins: string = statistics[0].nativeElement.textContent;
            const draws: string = statistics[1].nativeElement.textContent;
            const loses: string = statistics[2].nativeElement.textContent;

            expect(wins).withContext(`Should render paragraph with 'Your wins: 1' text`).toContain('Your wins: 1');
            expect(draws).withContext(`Should render paragraph with 'Your draws: 2' text`).toContain('Your draws: 2');
            expect(loses).withContext(`Should render paragraph with 'Your loses: 3' text`).toContain('Your loses: 3');
        });

        it(`Should render 2 'swapi-wide-button' components`, () => {
            const swapiWideButtons: DebugElement[] = debugElement.queryAll(By.css('swapi-wide-button'));

            expect(swapiWideButtons.length).withContext(`Should be only 2 'swapi-wide-button' components`).toEqual(2);
        });

        it(`Should call 'playAgain' method on 'Play again' component click`, () => {
            const swapiWideButtons: DebugElement[] = debugElement.queryAll(By.css('swapi-wide-button'));
            const playAgain: DebugElement = swapiWideButtons[0];

            spyOn(component, 'playAgain');

            playAgain.triggerEventHandler('click', null);

            expect(component.playAgain).withContext(`Should call 'playAgain' method on click`).toHaveBeenCalled();
        });

        it(`Should call 'navigateToHomePage' method on 'Home Page' component click`, () => {
            const swapiWideButtons: DebugElement[] = debugElement.queryAll(By.css('swapi-wide-button'));
            const navigateToHomePage: DebugElement = swapiWideButtons[1];

            spyOn(component, 'navigateToHomePage');

            navigateToHomePage.triggerEventHandler('click', null);

            expect(component.navigateToHomePage).withContext(`Should call 'navigateToHomePage' method on click`).toHaveBeenCalled();
        });
    });

    describe(`Component's logic`, () => {
        describe('ngOnInit method', () => {
            it(`Should init 'player$' property`, () => {
                const playerOneData: PlayerScore = {
                    wins: 1,
                    draws: 2,
                    loses: 3,
                };

                spyOn(gameService, 'getPlayer$').and.returnValue(new BehaviorSubject<PlayerScore>(playerOneData));

                component.ngOnInit();

                expect(component.player$.getValue()).withContext(`'Player$' property should equal value from 'getPlayer$' method`).toEqual(gameService.getPlayer$().getValue());
            });

            it(`Should init 'currentResult' property`, () => {
                const result: Result = Result.LOSE;

                gameService.currentResult = result;

                expect(component.currentResult).withContext(`'CurrentResult' property should not be defined yet`).toBeFalsy();

                component.ngOnInit();

                expect(component.currentResult).withContext(`'CurrentResult' property should equal value from 'GameService'`).toEqual(result);
            });
        });

        describe('playAgain method', () => {
            it('Should close dialog', () => {
                spyOn(dialogRef, 'close');

                component.playAgain();

                expect(dialogRef.close).withContext('Method to close dialog should be called once').toHaveBeenCalled();
            });

            it(`Should call once 'playGame' method from 'GameService'`, () => {
                spyOn(gameService, 'playGame');

                component.playAgain();

                expect(gameService.playGame).withContext(`'playGame' method from 'GameService' should be called once`).toHaveBeenCalled();
            });
        });

        describe('navigateToHomePage method', () => {
            it('Should close dialog', () => {
                spyOn(dialogRef, 'close');

                component.navigateToHomePage();

                expect(dialogRef.close).withContext('Method to close dialog should be called once').toHaveBeenCalled();
            });

            it(`Should call once 'navigateToHomePage' method from 'GameService'`, () => {
                spyOn(gameService, 'navigateToHomePage');

                component.navigateToHomePage();

                expect(gameService.navigateToHomePage).withContext(`'navigateToHomePage' method from 'GameService' should be called once`).toHaveBeenCalled();
            });
        });
    });
});
