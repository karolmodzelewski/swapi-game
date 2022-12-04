import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WideButtonComponent } from './wide-button.component';

describe('WideButtonComponent', () => {
    let component: WideButtonComponent;
    let fixture: ComponentFixture<WideButtonComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [WideButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WideButtonComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it('Should render button', () => {
        const components: DebugElement[] = debugElement.queryAll(By.css('button.button'));

        expect(components.length).withContext('Should be only 1 button').toEqual(1);
    });

    it('Should properly render button with data from inputs', () => {
        const text: string = 'Some button text';
        const disabled: boolean = true;

        fixture.componentRef.setInput('text', text);
        fixture.componentRef.setInput('disabled', disabled);
        fixture.detectChanges();

        const components: DebugElement[] = debugElement.queryAll(By.css('button.button'));

        expect(components[0].nativeElement.textContent).withContext(`Should have 'Some button text' text inside`).toEqual(text);
        expect(components[0].nativeElement.disabled).withContext(`Should be disabled`).toEqual(true);
    });
});
