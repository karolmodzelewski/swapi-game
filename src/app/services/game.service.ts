import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { Attribute } from '../enums/attribute.enum';
import { GameFormControl } from '../enums/game-form-control.enum';
import { Player } from '../enums/player.enum';
import { Resource } from '../enums/resource.enum';
import { PlayerConfiguration } from '../interfaces/player-configuration.interface';
import { PlayerScore } from '../interfaces/player-score.interface';
import { Result } from '../enums/result.enum';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    public playerOne$: BehaviorSubject<PlayerScore> = new BehaviorSubject<PlayerScore>({
        wins: 0,
        draws: 0,
        loses: 0,
    });
    public playerTwo$: BehaviorSubject<PlayerScore> = new BehaviorSubject<PlayerScore>({
        wins: 0,
        draws: 0,
        loses: 0,
    });
    public playerConfiguration: PlayerConfiguration;
    public currentResult: Result;
    public totalPeopleRecords: number;
    public totalStarshipsRecords: number;
    public shouldPlayGame: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public form: FormGroup = new FormGroup({
        [GameFormControl.RESOURCE]: new FormControl<Resource>(null, Validators.required),
        [GameFormControl.ATTRIBUTE]: new FormControl<Attribute>(null, Validators.required),
        [GameFormControl.PLAYER]: new FormControl<Player>(null, Validators.required),
    });

    constructor(private router: Router) {}

    public navigateToHomePage(): void {
        this.resetFormAndConfiguration();
        this.router.navigate(['/']);
    }

    public getPlayer$(): BehaviorSubject<PlayerScore> {
        return this.playerConfiguration?.[GameFormControl.PLAYER] === Player.PLAYER_ONE ? this.playerOne$ : this.playerTwo$;
    }

    public playGame(): void {
        this.shouldPlayGame.next(true);
    }

    private resetFormAndConfiguration(): void {
        this.form.reset();
        this.playerConfiguration = null;
        this.currentResult = null;
    }
}
