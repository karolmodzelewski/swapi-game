import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AttributeComponent } from './attribute.component';
import { Attribute } from '../../../../enums/attribute.enum';

describe('AttributeComponent', () => {
    let component: AttributeComponent;
    let fixture: ComponentFixture<AttributeComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AttributeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AttributeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it('Should render only 1 paragraph', () => {
        fixture.componentRef.setInput('attribute', Attribute.HEIGHT);
        fixture.detectChanges();

        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('p'));

        expect(paragraphs.length).withContext(`Component should have only one rendered paragraph`).toEqual(1);
    });

    it(`Should render 'Mass' text`, () => {
        fixture.componentRef.setInput('attribute', Attribute.MASS);
        fixture.detectChanges();

        const paragraph: DebugElement = debugElement.query(By.css('p'));

        expect(paragraph.nativeElement.textContent).withContext(`Paragraph should have 'Mass' text`).toEqual('Mass');
    });

    it(`Should render 'Max atmosphering speed' text`, () => {
        fixture.componentRef.setInput('attribute', Attribute.MAX_ATMOSPHERING_SPEED);
        fixture.detectChanges();

        const paragraph: DebugElement = debugElement.query(By.css('p'));

        expect(paragraph.nativeElement.textContent).withContext(`Paragraph should have 'Max atmosphering speed' text`).toEqual('Max atmosphering speed');
    });
});
