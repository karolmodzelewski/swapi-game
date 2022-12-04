import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
    let component: ScoreComponent;
    let fixture: ComponentFixture<ScoreComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScoreComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ScoreComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it('Should have 3 paragraphs', () => {
        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('p'));

        expect(paragraphs.length).withContext('Component should have 3 paragraphs').toEqual(3);
    });

    it('Should show 3 wins, 1 draw and 2 loses', () => {
        fixture.componentRef.setInput('player', { wins: 3, draws: 1, loses: 2 });
        fixture.detectChanges();

        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('p'));

        expect(paragraphs[0].nativeElement.textContent).withContext(`Paragraph should contain 'Wins: 3' text`).toContain('Wins: 3');
        expect(paragraphs[1].nativeElement.textContent).withContext(`Paragraph should contain 'Draws: 1' text`).toContain('Draws: 1');
        expect(paragraphs[2].nativeElement.textContent).withContext(`Paragraph should contain 'Loses: 2' text`).toContain('Loses: 2');
    });

    it('Should show 0 wins, 0 draws and 0 loses', () => {
        fixture.componentRef.setInput('player', { wins: 0, draws: 0, loses: 0 });
        fixture.detectChanges();

        const paragraphs: DebugElement[] = debugElement.queryAll(By.css('p'));

        expect(paragraphs[0].nativeElement.textContent).withContext(`Paragraph should contain 'Wins: 0' text`).toContain('Wins: 0');
        expect(paragraphs[1].nativeElement.textContent).withContext(`Paragraph should contain 'Draws: 0' text`).toContain('Draws: 0');
        expect(paragraphs[2].nativeElement.textContent).withContext(`Paragraph should contain 'Loses: 0' text`).toContain('Loses: 0');
    });
});
