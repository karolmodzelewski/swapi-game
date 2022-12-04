import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PlayerScore } from '../../../../interfaces/player-score.interface';

@Component({
    selector: 'swapi-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
    @Input()
    public player: PlayerScore;
}
