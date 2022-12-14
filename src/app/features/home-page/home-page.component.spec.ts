import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';
import { Player } from '../../enums/player.enum';
import { GameFormControl } from '../../enums/game-form-control.enum';
import { Resource } from '../../enums/resource.enum';
import { Attribute } from '../../enums/attribute.enum';
import { HomePageComponent } from './home-page.component';
import { HomePageModule } from './home-page.module';
import { PlayerConfiguration } from '../../interfaces/player-configuration.interface';
import { GameComponent } from '../game/game.component';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let debugElement: DebugElement;
    let gameService: GameService;
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [HomePageModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([{ path: 'game', component: GameComponent }])],
            providers: [GameService],
        }).compileComponents();

        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        gameService = TestBed.inject(GameService);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    describe('Template', () => {
        it('Should render 3 sections with 3 headings', () => {
            const sections: DebugElement[] = debugElement.queryAll(By.css('.section'));
            const headings: DebugElement[] = debugElement.queryAll(By.css('h1.heading'));

            expect(sections.length).withContext('Should be 3 sections').toEqual(3);
            expect(headings.length).withContext('Should be 3 headings').toEqual(3);
        });

        it(`Should render 4 'swapi-resource' components`, () => {
            const components: DebugElement[] = debugElement.queryAll(By.css('swapi-resource'));

            expect(components.length).withContext(`Should be 4 'swapi-resource' components`).toEqual(4);
        });

        it(`Should render 2 'swapi-score' components`, () => {
            const components: DebugElement[] = debugElement.queryAll(By.css('swapi-score'));

            expect(components.length).withContext(`Should be 2 'swapi-score' components`).toEqual(2);
        });

        it(`Should render 1 'swapi-wide-button' component`, () => {
            const components: DebugElement[] = debugElement.queryAll(By.css('swapi-wide-button'));

            expect(components.length).withContext(`Should be 1 'swapi-wide-button' component`).toEqual(1);
        });
    });

    describe(`Component's logic`, () => {
        describe('Form interactions', () => {
            it(`Should properly apply values to form for 'Resource.PEOPLE'`, () => {
                const components: DebugElement[] = debugElement.queryAll(By.css('swapi-resource'));

                spyOn(component, 'selectResource').and.callThrough();

                const resource: DebugElement = components[0];

                resource.triggerEventHandler('click', null);

                expect(component.selectResource).withContext(`Should call 'selectResource' method`).toHaveBeenCalled();

                const resourceFormControlValue: Resource = component.form.get(GameFormControl.RESOURCE).value;

                expect(resourceFormControlValue).withContext(`'RESOURCE' property in form should have 'Resource.PEOPLE' value`).toEqual(Resource.PEOPLE);
            });

            it(`Should properly apply values to form for 'Resource.STARSHIPS'`, () => {
                const components: DebugElement[] = debugElement.queryAll(By.css('swapi-resource'));

                spyOn(component, 'selectResource').and.callThrough();

                const resource: DebugElement = components[1];

                resource.triggerEventHandler('click', null);

                expect(component.selectResource).withContext(`Should call 'selectResource' method`).toHaveBeenCalled();

                const resourceFormControlValue: Resource = component.form.get(GameFormControl.RESOURCE).value;

                expect(resourceFormControlValue).withContext(`'RESOURCE' property in form should have 'Resource.STARSHIPS' value`).toEqual(Resource.STARSHIPS);
            });

            it(`Should properly apply values to form for 'Player.PLAYER_ONE'`, () => {
                const components: DebugElement[] = debugElement.queryAll(By.css('swapi-resource'));

                spyOn(component, 'selectPlayer').and.callThrough();

                const player: DebugElement = components[2];

                player.triggerEventHandler('click', null);

                expect(component.selectPlayer).withContext(`Should call 'selectPlayer' method`).toHaveBeenCalled();

                const playerFormControlValue: Player = component.form.get(GameFormControl.PLAYER).value;

                expect(playerFormControlValue).withContext(`'PLAYER' property in form should have 'Player.PLAYER_ONE' value`).toEqual(Player.PLAYER_ONE);
            });

            it(`Should properly apply values to form for 'Player.PLAYER_TWO'`, () => {
                const components: DebugElement[] = debugElement.queryAll(By.css('swapi-resource'));

                spyOn(component, 'selectPlayer').and.callThrough();

                const player: DebugElement = components[3];

                player.triggerEventHandler('click', null);

                expect(component.selectPlayer).withContext(`Should call 'selectPlayer' method`).toHaveBeenCalled();

                const playerFormControlValue: Player = component.form.get(GameFormControl.PLAYER).value;

                expect(playerFormControlValue).withContext(`'PLAYER' property in form should have 'Player.PLAYER_TWO' value`).toEqual(Player.PLAYER_TWO);
            });
        });

        describe('ngOnInit method', () => {
            it('Should init form and player scores', () => {
                component.form = null;
                component.playerOne$ = null;
                component.playerTwo$ = null;

                component.ngOnInit();

                expect(component.form).withContext(`Property 'form' should be initialized`).toBeTruthy();
                expect(component.playerOne$).withContext(`Property 'playerOne$' should be initialized`).toBeTruthy();
                expect(component.playerTwo$).withContext(`Property 'playerTwo$' should be initialized`).toBeTruthy();
            });
        });

        describe('selectResource method', () => {
            it(`Should set proper resources and attributes for 'Resource.PEOPLE'`, () => {
                const playerFormControl: FormControl<Resource> = component.form.get(GameFormControl.RESOURCE) as FormControl<Resource>;
                const attributesFixture: Attribute[] = [Attribute.HEIGHT, Attribute.MASS];

                component.selectResource(Resource.PEOPLE);

                expect(playerFormControl.value).withContext(`'RESOURCE' property in form should have 'Resource.PEOPLE' value`).toEqual(Resource.PEOPLE);

                component.attributes$.subscribe((attributes: Attribute[]) => {
                    expect(attributes).withContext(`Attributes should equal '[Attribute.HEIGHT, Attribute.MASS]'`).toEqual(attributesFixture);
                });
            });

            it(`Should set proper resources and attributes for 'Resource.STARSHIPS'`, () => {
                const playerFormControl: FormControl<Resource> = component.form.get(GameFormControl.RESOURCE) as FormControl<Resource>;
                const attributesFixture: Attribute[] = [Attribute.LENGTH, Attribute.COST_IN_CREDITS, Attribute.MAX_ATMOSPHERING_SPEED];

                component.selectResource(Resource.STARSHIPS);

                expect(playerFormControl.value).withContext(`'RESOURCE' property in form should have 'Resource.STARSHIPS' value`).toEqual(Resource.STARSHIPS);

                component.attributes$.subscribe((attributes: Attribute[]) => {
                    expect(attributes).withContext(`Attributes should equal '[Attribute.LENGTH, Attribute.COST_IN_CREDITS, Attribute.MAX_ATMOSPHERING_SPEED]'`).toEqual(attributesFixture);
                });
            });

            it(`Should reset 'attributeFormControl' if it has value`, () => {
                const attributeFormControl: FormControl<Attribute> = component.form.get(GameFormControl.ATTRIBUTE) as FormControl<Attribute>;

                spyOn(attributeFormControl, 'reset');

                attributeFormControl.setValue(Attribute.COST_IN_CREDITS);

                component.selectResource(Resource.STARSHIPS);

                expect(attributeFormControl.reset).toHaveBeenCalled();
            });
        });

        describe('selectPlayer method', () => {
            it(`Should set a proper 'PLAYER' value`, () => {
                const playerFormControl: FormControl<Player> = component.form.get(GameFormControl.PLAYER) as FormControl<Player>;

                component.selectPlayer(Player.PLAYER_ONE);

                expect(playerFormControl.value).withContext(`'PLAYER' property in form should have 'Player.PLAYER_ONE' value`).toEqual(Player.PLAYER_ONE);

                component.selectPlayer(Player.PLAYER_TWO);

                expect(playerFormControl.value).withContext(`'PLAYER' property in form should have 'Player.PLAYER_TWO' value`).toEqual(Player.PLAYER_TWO);
            });
        });

        describe('playGame method', () => {
            it('Should not call any methods if form is invalid', () => {
                spyOn(component, 'playGame').and.callThrough();
                spyOn(router, 'navigate');

                component.playGame();

                expect(component.playGame).withContext(`Should call 'playGame' method`).toHaveBeenCalled();
                expect(router.navigate).withContext('Should not navigate anywhere').not.toHaveBeenCalled();
            });

            it('Should set player configuration', () => {
                component.form.get(GameFormControl.RESOURCE).setValue(Resource.STARSHIPS);
                component.form.get(GameFormControl.ATTRIBUTE).setValue(Attribute.COST_IN_CREDITS);
                component.form.get(GameFormControl.PLAYER).setValue(Player.PLAYER_ONE);

                const formValue: PlayerConfiguration = component.form.value;

                spyOn(component, 'playGame').and.callThrough();

                component.playGame();

                expect(gameService.playerConfiguration).withContext('PlayerConfiguration should be the same as form value').toEqual(formValue);
            });

            it('Should navigate to game page', () => {
                component.form.get(GameFormControl.RESOURCE).setValue(Resource.STARSHIPS);
                component.form.get(GameFormControl.ATTRIBUTE).setValue(Attribute.COST_IN_CREDITS);
                component.form.get(GameFormControl.PLAYER).setValue(Player.PLAYER_ONE);

                spyOn(component, 'playGame').and.callThrough();
                spyOn(router, 'navigate');

                component.playGame();

                expect(router.navigate).withContext(`Router should navigate with 'game' path`).toHaveBeenCalledWith(['game']);
            });
        });
    });
});
