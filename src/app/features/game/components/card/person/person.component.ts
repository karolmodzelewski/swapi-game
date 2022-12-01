import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { SelectedResource } from '../../../types/selected-resource.type';

@Component({
    selector: 'swapi-person',
    templateUrl: './person.component.html',
    styleUrls: ['../styles/_description.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
    @Input()
    public resourceData$: Observable<SelectedResource>;
}
