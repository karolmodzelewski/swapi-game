import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'swapi-error-state',
    templateUrl: './error-state.component.html',
    styleUrls: ['./error-state.component.scss'],
    standalone: true,
    imports: [MatIconModule],
})
export class ErrorStateComponent {}
