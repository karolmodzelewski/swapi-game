import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorStateComponent } from './error-state.component';

describe('ErrorStateComponent', () => {
    let component: ErrorStateComponent;
    let fixture: ComponentFixture<ErrorStateComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ErrorStateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorStateComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it(`Should render 1 'mat-icon' component`, () => {
        const components: DebugElement[] = debugElement.queryAll(By.css('mat-icon'));

        expect(components.length).withContext(`Should be only 1 'mat-icon' component`).toEqual(1);
    });

    it(`Should render paragraph with 'error-state' text`, () => {
        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('.warning-text'));

        expect(paragraphs.length).withContext(`Should be only 1 'warning-text' paragraph`).toEqual(1);
        expect(paragraphs[0].nativeElement.textContent).withContext(`Should contain 'Something went wrong. Try again.' text`).toEqual('Something went wrong. Try again.');
    });
});
