import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { Attribute } from '../enums/attribute.enum';
import { GameFormControl } from '../enums/game-form-control.enum';
import { Player } from '../enums/player.enum';
import { Resource } from '../enums/resource.enum';
import { PlayerScore } from '../interfaces/player-score.interface';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    public playerOne$: BehaviorSubject<PlayerScore> = new BehaviorSubject<PlayerScore>({
        wins: 0,
        loses: 0,
    });
    public playerTwo$: BehaviorSubject<PlayerScore> = new BehaviorSubject<PlayerScore>({
        wins: 0,
        loses: 0,
    });
    public form: FormGroup = new FormGroup({
        [GameFormControl.RESOURCE]: new FormControl<Resource | null>(null, Validators.required),
        [GameFormControl.ATTRIBUTE]: new FormControl<Attribute | null>(null, Validators.required),
        [GameFormControl.PLAYER]: new FormControl<Player | null>(null, Validators.required),
    });
}
