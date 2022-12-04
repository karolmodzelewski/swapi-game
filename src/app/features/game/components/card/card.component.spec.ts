import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Player } from '../../../../enums/player.enum';
import { Attribute } from '../../../../enums/attribute.enum';
import { Resource } from '../../../../enums/resource.enum';
import { GameFormControl } from '../../../../enums/game-form-control.enum';
import { PlayerConfiguration } from '../../../../interfaces/player-configuration.interface';
import { CardComponent } from './card.component';
import { GameModule } from '../../game.module';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CardComponent],
            imports: [GameModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it('Should properly render heading with given text', () => {
        const text: string = 'Some heading text';

        fixture.componentRef.setInput('heading', text);
        fixture.detectChanges();

        const headings: DebugElement[] = debugElement.queryAll(By.css('h1.heading'));

        expect(headings.length).withContext('Should render only 1 heading').toEqual(1);
        expect(headings[0].nativeElement.textContent).withContext(`Heading text should be: 'Some heading text'`).toEqual(text);
    });

    it(`Should render 'mat-card' component for 'Resource.PEOPLE' playerConfiguration`, () => {
        const imageSource: string = 'assets/images/png/player-one.png';
        const playerConfiguration: PlayerConfiguration = {
            [GameFormControl.RESOURCE]: Resource.PEOPLE,
            [GameFormControl.ATTRIBUTE]: Attribute.HEIGHT,
            [GameFormControl.PLAYER]: Player.PLAYER_ONE,
        };

        fixture.componentRef.setInput('imageSource', imageSource);
        fixture.componentRef.setInput('playerConfiguration', playerConfiguration);
        fixture.detectChanges();

        const images: DebugElement[] = debugElement.queryAll(By.css('img.image'));
        const swapiPersonComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-person'));
        const swapiStarshipComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-starship'));

        expect(images.length).withContext('Should render only 1 image').toEqual(1);
        expect(images[0].nativeElement.src).withContext(`Image should have source from with 'imageSource' variable`).toContain(imageSource);
        expect(swapiPersonComponents.length).withContext(`Should render only 1 'swapi-person' component`).toEqual(1);
        expect(swapiStarshipComponents.length).withContext(`Should not render any 'swapi-starship' components`).toEqual(0);
    });

    it(`Should render 'mat-card' component for 'Resource.STARSHIPS' playerConfiguration`, () => {
        const imageSource: string = 'assets/images/png/player-one.png';
        const playerConfiguration: PlayerConfiguration = {
            [GameFormControl.RESOURCE]: Resource.STARSHIPS,
            [GameFormControl.ATTRIBUTE]: Attribute.COST_IN_CREDITS,
            [GameFormControl.PLAYER]: Player.PLAYER_ONE,
        };

        fixture.componentRef.setInput('imageSource', imageSource);
        fixture.componentRef.setInput('playerConfiguration', playerConfiguration);
        fixture.detectChanges();

        const images: DebugElement[] = debugElement.queryAll(By.css('img.image'));
        const swapiPersonComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-person'));
        const swapiStarshipComponents: DebugElement[] = debugElement.queryAll(By.css('swapi-starship'));

        expect(images.length).withContext('Should render only 1 image').toEqual(1);
        expect(images[0].nativeElement.src).withContext(`Image should have source from with 'imageSource' variable`).toContain(imageSource);
        expect(swapiPersonComponents.length).withContext(`Should render only 1 'swapi-person' component`).toEqual(0);
        expect(swapiStarshipComponents.length).withContext(`Should not render any 'swapi-starship' components`).toEqual(1);
    });
});
