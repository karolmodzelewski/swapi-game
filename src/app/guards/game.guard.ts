import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { GameService } from './../services/game.service';

@Injectable({
    providedIn: 'root',
})
export class GameGuard implements CanActivate {
    constructor(private gameService: GameService, private router: Router) {}

    public canActivate(): boolean {
        if (this.gameService?.form?.invalid || !this.gameService.playerConfiguration) {
            this.router.navigate(['/']);

            return false;
        }

        return true;
    }
}
