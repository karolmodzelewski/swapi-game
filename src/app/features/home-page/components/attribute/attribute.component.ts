import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Attribute } from '../../../../enums/attribute.enum';

@Component({
    selector: 'swapi-attribute',
    templateUrl: './attribute.component.html',
    styleUrls: ['./attribute.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributeComponent {
    @Input()
    public attribute: Attribute;

    public Attribute: typeof Attribute = Attribute;
}
