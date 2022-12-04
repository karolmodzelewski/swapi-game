import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { PlayerScore } from '../../interfaces/player-score.interface';
import { GameService } from '../../services/game.service';
import { Attribute } from '../../enums/attribute.enum';
import { GameFormControl } from '../../enums/game-form-control.enum';
import { Resource } from '../../enums/resource.enum';
import { Player } from '../../enums/player.enum';

@Component({
    selector: 'swapi-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public form: FormGroup;
    public playerOne$: BehaviorSubject<PlayerScore>;
    public playerTwo$: BehaviorSubject<PlayerScore>;
    public attributes$: BehaviorSubject<Attribute[]> = new BehaviorSubject<Attribute[]>([]);
    public GameFormControl: typeof GameFormControl = GameFormControl;
    public Resource: typeof Resource = Resource;
    public Player: typeof Player = Player;
    public peopleResourceHeading: string = 'People';
    public starshipsResourceHeading: string = 'Starships';
    public playerOneResourceHeading: string = 'You';
    public playerTwoResourceHeading: string = 'You (2)';
    public peopleResourceImageSource: string = 'assets/images/png/person.png';
    public starshipsResourceImageSource: string = 'assets/images/png/starship.png';
    public playerOneResourceImageSource: string = 'assets/images/png/player-one.png';
    public playerTwoResourceImageSource: string = 'assets/images/png/player-two.png';
    public playButtonText: string = 'Play';

    public get resourceFormControl(): FormControl<Resource> {
        return this.form.get(GameFormControl.RESOURCE) as FormControl<Resource>;
    }

    public get attributeFormControl(): FormControl<Attribute> {
        return this.form.get(GameFormControl.ATTRIBUTE) as FormControl<Attribute>;
    }

    public get playerFormControl(): FormControl<Player> {
        return this.form.get(GameFormControl.PLAYER) as FormControl<Player>;
    }

    constructor(private gameService: GameService, private router: Router) {}

    public ngOnInit(): void {
        this.initPlayersScores();
        this.initForm();
    }

    public selectResource(resource: Resource): void {
        this.resourceFormControl?.setValue(resource);

        if (this.attributeFormControl.value) {
            this.attributeFormControl.reset();
        }

        resource === Resource.PEOPLE ? this.setAttributes([Attribute.HEIGHT, Attribute.MASS]) : this.setAttributes([Attribute.LENGTH, Attribute.COST_IN_CREDITS, Attribute.MAX_ATMOSPHERING_SPEED]);
    }

    public selectPlayer(player: Player): void {
        this.form.get(GameFormControl.PLAYER)?.setValue(player);
    }

    public playGame(): void {
        if (this.form.invalid) {
            return;
        }

        this.setPlayerConfiguration();
        this.navigateToGamePage();
    }

    private setPlayerConfiguration(): void {
        this.gameService.playerConfiguration = this.form.value;
    }

    private navigateToGamePage(): void {
        this.router.navigate(['game']);
    }

    private setAttributes(attributes: Attribute[]): void {
        this.attributes$.next(attributes);
    }

    private initPlayersScores(): void {
        this.playerOne$ = this.gameService.playerOne$;
        this.playerTwo$ = this.gameService.playerTwo$;
    }

    private initForm(): void {
        this.form = this.gameService.form;
    }
}
