import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { PlayerConfiguration } from '../../../../interfaces/player-configuration.interface';
import { GameFormControl } from '../../../../enums/game-form-control.enum';
import { SelectedResource } from '../../types/selected-resource.type';
import { Resource } from '../../../../enums/resource.enum';

@Component({
    selector: 'swapi-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input()
    public heading: string;
    @Input()
    public imageSource: string;
    @Input()
    public playerConfiguration: PlayerConfiguration;
    @Input()
    public resourceData$: Observable<SelectedResource>;

    public GameFormControl: typeof GameFormControl = GameFormControl;
    public Resource: typeof Resource = Resource;
}
