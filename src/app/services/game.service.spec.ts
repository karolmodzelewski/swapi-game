import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { GameService } from './game.service';
import { Result } from '../enums/result.enum';
import { GameFormControl } from '../enums/game-form-control.enum';
import { Resource } from '../enums/resource.enum';
import { Player } from '../enums/player.enum';
import { Attribute } from '../enums/attribute.enum';
import { PlayerScore } from '../interfaces/player-score.interface';

describe('GameService', () => {
    let service: GameService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        }).compileComponents();

        service = TestBed.inject(GameService);
        router = TestBed.inject(Router);
    });

    it('Should create a service', () => {
        expect(service).withContext('Service should be created').toBeTruthy();
    });

    describe('navigateToHomePage method', () => {
        it('Should reset form and configuration', () => {
            spyOn(service.form, 'reset');

            service.playerConfiguration = {
                [GameFormControl.RESOURCE]: Resource.STARSHIPS,
                [GameFormControl.ATTRIBUTE]: Attribute.COST_IN_CREDITS,
                [GameFormControl.PLAYER]: Player.PLAYER_ONE,
            };
            service.currentResult = Result.DRAW;

            service.navigateToHomePage();

            expect(service.form.reset).withContext('Form should be resetted').toHaveBeenCalled();
            expect(service.playerConfiguration).withContext(`'PlayerConfiguration should be null'`).toEqual(null);
            expect(service.currentResult).withContext(`'CurrentResult should be null'`).toEqual(null);
        });

        it('Should navigate to home page', () => {
            spyOn(router, 'navigate');

            service.navigateToHomePage();

            expect(router.navigate).withContext(`Should navigate to '/' path`).toHaveBeenCalledWith(['/']);
        });
    });

    describe('getPlayer$ method', () => {
        const playerOneData: PlayerScore = {
            wins: 1,
            draws: 2,
            loses: 3,
        };
        const playerTwoData: PlayerScore = {
            wins: 4,
            draws: 5,
            loses: 6,
        };

        beforeEach(() => {
            service.playerOne$ = new BehaviorSubject<PlayerScore>(playerOneData);
            service.playerTwo$ = new BehaviorSubject<PlayerScore>(playerTwoData);
        });

        it(`Should get 'playerOne$' `, () => {
            service.playerConfiguration = {
                [GameFormControl.RESOURCE]: Resource.STARSHIPS,
                [GameFormControl.ATTRIBUTE]: Attribute.COST_IN_CREDITS,
                [GameFormControl.PLAYER]: Player.PLAYER_ONE,
            };

            expect(service.getPlayer$().getValue()).withContext(`Should get 'playerOne$'`).toEqual(playerOneData);
        });

        it(`Should get 'playerTwo$' `, () => {
            service.playerConfiguration = {
                [GameFormControl.RESOURCE]: Resource.STARSHIPS,
                [GameFormControl.ATTRIBUTE]: Attribute.COST_IN_CREDITS,
                [GameFormControl.PLAYER]: Player.PLAYER_TWO,
            };

            expect(service.getPlayer$().getValue()).withContext(`Should get 'playerTwo$'`).toEqual(playerTwoData);
        });
    });

    describe('playGame method', () => {
        it(`Should emit 'true' to 'shouldPlayGame' property`, () => {
            expect(service.shouldPlayGame.getValue()).withContext('Should be null').toEqual(null);

            service.playGame();

            expect(service.shouldPlayGame.getValue()).withContext('Should be true').toEqual(true);
        });
    });
});
