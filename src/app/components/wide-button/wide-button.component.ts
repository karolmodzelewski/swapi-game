import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'swapi-wide-button',
    templateUrl: './wide-button.component.html',
    styleUrls: ['./wide-button.component.scss'],
    standalone: true,
    imports: [MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WideButtonComponent {
    @Input()
    public text: string;
    @Input()
    public disabled: boolean;
}
