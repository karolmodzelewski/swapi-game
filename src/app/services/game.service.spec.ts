import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
    let service: GameService;

    beforeEach(() => {
        service = TestBed.inject(GameService);
    });

    it('Should create a service', () => {
        expect(service).withContext('Service should be created').toBeTruthy();
    });
});
