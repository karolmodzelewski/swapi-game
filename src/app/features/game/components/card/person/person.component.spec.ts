import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { PERSON_FIXTURE_DATA } from './fixtures/person.fixture';
import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
    let component: PersonComponent;
    let fixture: ComponentFixture<PersonComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PersonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PersonComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it(`Should render 'Name', 'Gender' and 'Height' properties in paragraphs`, () => {
        fixture.componentRef.setInput('resourceData$', of(PERSON_FIXTURE_DATA));
        fixture.detectChanges();

        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('p.property'));
        const name = paragraphs.find((paragraph: DebugElement) => paragraph.nativeElement.textContent.includes('Name: Luminara Unduli'));
        const gender = paragraphs.find((paragraph: DebugElement) => paragraph.nativeElement.textContent.includes('Gender: female'));
        const height = paragraphs.find((paragraph: DebugElement) => paragraph.nativeElement.textContent.includes('Height: 170'));

        expect(name).withContext(`Should render 'Name' property with data: 'Luminara Unduli'`).toBeTruthy();
        expect(gender).withContext(`Should render 'Gender' property with data: 'female'`).toBeTruthy();
        expect(height).withContext(`Should render 'Height' property with data: '170'`).toBeTruthy();
    });
});
