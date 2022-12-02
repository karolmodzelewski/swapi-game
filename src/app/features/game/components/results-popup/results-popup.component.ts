import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { BehaviorSubject } from 'rxjs';

import { Result } from '../../../../enums/result.enum';
import { PlayerScore } from '../../../../interfaces/player-score.interface';
import { GameService } from '../../../../services/game.service';

@Component({
    selector: 'swapi-results-popup',
    templateUrl: './results-popup.component.html',
    styleUrls: ['./results-popup.component.scss', './styles/_results.scss'],
})
export class ResultsPopupComponent implements OnInit {
    public player$: BehaviorSubject<PlayerScore>;
    public currentResult: Result;

    constructor(private gameService: GameService, private dialogRef: MatDialogRef<ResultsPopupComponent>) {}

    public ngOnInit(): void {
        this.player$ = this.gameService.getPlayer$();
        this.currentResult = this.gameService.currentResult;
    }

    public playAgain(): void {
        this.dialogRef.close();
        this.gameService.playGame();
    }

    public navigateToHomePage(): void {
        this.dialogRef.close();
        this.gameService.navigateToHomePage();
    }
}
