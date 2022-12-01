import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { of } from 'rxjs';

import { STARSHIP_FIXTURE_DATA } from './fixtures/starship.fixture';
import { StarshipComponent } from './starship.component';

describe('StarshipComponent', () => {
    let component: StarshipComponent;
    let fixture: ComponentFixture<StarshipComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StarshipComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StarshipComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it(`Should render 'Length', 'MGLT' and 'Crew' properties in paragraphs`, () => {
        fixture.componentRef.setInput('resourceData$', of(STARSHIP_FIXTURE_DATA));
        fixture.detectChanges();

        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('p.property'));
        const length = paragraphs.find((paragraph: DebugElement) => paragraph.nativeElement.textContent.includes('Length: 29.2'));
        const mglt = paragraphs.find((paragraph: DebugElement) => paragraph.nativeElement.textContent.includes('MGLT: unknown'));
        const crew = paragraphs.find((paragraph: DebugElement) => paragraph.nativeElement.textContent.includes('Crew: 3'));

        expect(length).withContext(`Should render 'Length' property with data: '29.2'`).toBeTruthy();
        expect(mglt).withContext(`Should render 'MGLT' property with data: 'unknown'`).toBeTruthy();
        expect(crew).withContext(`Should render 'Crew' property with data: '3'`).toBeTruthy();
    });
});
