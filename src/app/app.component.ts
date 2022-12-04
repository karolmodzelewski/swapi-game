import { Component } from '@angular/core';

import { GameService } from './services/game.service';

@Component({
    selector: 'swapi-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private gameService: GameService) {}

    public navigateToHomePage(): void {
        this.gameService.navigateToHomePage();
    }
}
