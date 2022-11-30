import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ResourceComponent } from './resource.component';

describe('ResourceComponent', () => {
    let component: ResourceComponent;
    let fixture: ComponentFixture<ResourceComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResourceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ResourceComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    }));

    it('Should create a component', () => {
        expect(component).withContext('Component should be created').toBeTruthy();
    });

    it(`Should have 1 'resource' div`, () => {
        const divs: DebugElement[] = debugElement.queryAll(By.css('.resource'));

        expect(divs.length).withContext(`Should be 1 'resource' div`).toEqual(1);
    });

    it(`Should show 1 image and 1 'image-container' div`, () => {
        const divs: DebugElement[] = debugElement.queryAll(By.css('.image-container'));
        const images: DebugElement[] = debugElement.queryAll(By.css('img'));

        expect(divs.length).withContext(`Should be 1 'image-container' div`).toEqual(1);
        expect(images.length).withContext(`Should be 1 image`).toEqual(1);
    });

    it('Should set an image source to the link', () => {
        fixture.componentRef.setInput('imageSource', 'assets/images/png/person.png');
        fixture.detectChanges();

        const image: DebugElement = debugElement.query(By.css('img'));

        expect(image.nativeElement.src).withContext('Should have an image source').toContain('assets/images/png/person.png');
    });

    it(`Should show 1 heading`, () => {
        const headings: DebugElement[] = debugElement.queryAll(By.css('h2'));

        expect(headings.length).withContext('Should be 1 heading').toEqual(1);
    });

    it(`Should add 'selected' class to 'resource' div and heading`, () => {
        const resourceDiv: DebugElement = debugElement.query(By.css('.resource'));
        const heading: DebugElement = debugElement.query(By.css('h2'));

        expect(resourceDiv.nativeElement.classList.contains('selected')).withContext(`Should not have 'selected' class`).toBeFalsy();
        expect(heading.nativeElement.classList.contains('selected')).withContext(`Should not have 'selected' class`).toBeFalsy();

        fixture.componentRef.setInput('selected', true);
        fixture.detectChanges();

        expect(resourceDiv.nativeElement.classList.contains('selected')).withContext(`Should have 'selected' class`).toBeTruthy();
        expect(heading.nativeElement.classList.contains('selected')).withContext(`Should have 'selected' class`).toBeTruthy();
    });
});
