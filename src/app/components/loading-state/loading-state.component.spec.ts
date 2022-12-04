import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingStateComponent } from './loading-state.component';

describe('LoadingStateComponent', () => {
    let component: LoadingStateComponent;
    let fixture: ComponentFixture<LoadingStateComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LoadingStateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LoadingStateComponent);
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
        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('.loading-text'));

        expect(paragraphs.length).withContext(`Should be only 1 'loading-text' paragraph`).toEqual(1);
        expect(paragraphs[0].nativeElement.textContent).withContext(`Should contain 'Loading...' text`).toEqual('Loading...');
    });
});
