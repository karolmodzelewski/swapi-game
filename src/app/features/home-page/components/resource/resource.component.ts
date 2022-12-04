import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'swapi-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent {
    @Input()
    public selected: boolean;
    @Input()
    public imageSource: string;
    @Input()
    public heading: string;
}
