import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultHeadingComponent } from './result-heading.component';
import { Result } from '../../../../../../enums/result.enum';

describe('ResultHeadingComponent', () => {
    let component: ResultHeadingComponent;
    let fixture: ComponentFixture<ResultHeadingComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResultHeadingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ResultHeadingComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it(`Should render 1 span with proper text for 'Result.WIN'`, () => {
        fixture.componentRef.setInput('currentResult', Result.WIN);
        fixture.detectChanges();

        const spans: DebugElement[] = debugElement.queryAll(By.css('span'));

        expect(spans.length).withContext('Should be only 1 span').toEqual(1);
        expect(spans[0].nativeElement.textContent).withContext(`Span should contain 'won!' text`).toEqual('won!');
        expect(spans[0].nativeElement).withContext(`Span should have 'color-green' class`).toHaveClass('color-green');
    });

    it(`Should render 1 span with proper text for 'Result.DRAW'`, () => {
        fixture.componentRef.setInput('currentResult', Result.DRAW);
        fixture.detectChanges();

        const spans: DebugElement[] = debugElement.queryAll(By.css('span'));

        expect(spans.length).withContext('Should be only 1 span').toEqual(1);
        expect(spans[0].nativeElement.textContent).withContext(`Span should contain 'drew.' text`).toEqual('drew.');
        expect(spans[0].nativeElement).withContext(`Span should have 'color-gray' class`).toHaveClass('color-gray');
    });

    it(`Should render 1 span with proper text for 'Result.LOSE'`, () => {
        fixture.componentRef.setInput('currentResult', Result.LOSE);
        fixture.detectChanges();

        const spans: DebugElement[] = debugElement.queryAll(By.css('span'));

        expect(spans.length).withContext('Should be only 1 span').toEqual(1);
        expect(spans[0].nativeElement.textContent).withContext(`Span should contain 'lost...' text`).toEqual('lost...');
        expect(spans[0].nativeElement).withContext(`Span should have 'color-red' class`).toHaveClass('color-red');
    });
});
