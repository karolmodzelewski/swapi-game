import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { SelectedResource } from '../../../types/selected-resource.type';

@Component({
    selector: 'swapi-starship',
    templateUrl: './starship.component.html',
    styleUrls: ['../styles/_description.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipComponent {
    @Input()
    public resourceData$: Observable<SelectedResource>;
}
