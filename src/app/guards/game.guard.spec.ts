import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { Player } from '../enums/player.enum';
import { Attribute } from './../enums/attribute.enum';
import { GameFormControl } from '../enums/game-form-control.enum';
import { Resource } from '../enums/resource.enum';
import { GameService } from './../services/game.service';
import { GameGuard } from './game.guard';

describe('GameGuard', () => {
    let guard: GameGuard;
    let gameService: GameService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GameService],
        });

        guard = TestBed.inject(GameGuard);
        gameService = TestBed.inject(GameService);
        router = TestBed.inject(Router);
    });

    it('Should create the guard', () => {
        expect(guard).withContext('Guard should be created').toBeTruthy();
    });

    describe('canActivate method', () => {
        it('Should not activate and navigate back to home page if form is invalid and there is no playerConfiguration', () => {
            spyOn(router, 'navigate');

            guard.canActivate();

            expect(guard.canActivate()).withContext('Should not activate if form is invalid and there is no playerConfiguration').toEqual(false);
            expect(router.navigate).withContext('Should navigate back to home page').toHaveBeenCalledWith(['/']);
        });

        it('Should not activate and navigate back to home page if form is valid but there is no playerConfiguration', () => {
            spyOn(router, 'navigate');

            gameService.form.get(GameFormControl.RESOURCE).setValue(Resource.STARSHIPS);
            gameService.form.get(GameFormControl.ATTRIBUTE).setValue(Attribute.COST_IN_CREDITS);
            gameService.form.get(GameFormControl.PLAYER).setValue(Player.PLAYER_ONE);

            guard.canActivate();

            expect(guard.canActivate()).withContext('Should not activate if form is valid but there is no playerConfiguration').toEqual(false);
            expect(router.navigate).withContext('Should navigate back to home page').toHaveBeenCalledWith(['/']);
        });

        it('Should not activate and navigate back to home page if form is invalid but there is a playerConfiguration', () => {
            spyOn(router, 'navigate');

            gameService.form.get(GameFormControl.RESOURCE).setValue(Resource.STARSHIPS);
            gameService.form.get(GameFormControl.ATTRIBUTE).setValue(Attribute.COST_IN_CREDITS);
            gameService.form.get(GameFormControl.PLAYER).setValue(Player.PLAYER_ONE);

            gameService.playerConfiguration = gameService.form.value;
            gameService.form.reset();

            guard.canActivate();

            expect(guard.canActivate()).withContext('Should not activate if form is invalid but there is a playerConfiguration').toEqual(false);
            expect(router.navigate).withContext('Should navigate back to home page').toHaveBeenCalledWith(['/']);
        });

        it('Should activate', () => {
            gameService.form.get(GameFormControl.RESOURCE).setValue(Resource.STARSHIPS);
            gameService.form.get(GameFormControl.ATTRIBUTE).setValue(Attribute.COST_IN_CREDITS);
            gameService.form.get(GameFormControl.PLAYER).setValue(Player.PLAYER_ONE);

            gameService.playerConfiguration = gameService.form.value;

            guard.canActivate();

            expect(guard.canActivate()).withContext('Should activate if form is valid and there is a playerConfiguration').toEqual(true);
        });
    });
});
