import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';

import { GameService } from './services/game.service';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AppComponent } from './app.component';
import { HomePageModule } from './features/home-page/home-page.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home-page/home-page.module').then((m) => m.HomePageModule),
    },
];

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;
    let router: Router;
    let gameService: GameService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), HomePageModule, BrowserAnimationsModule],
            declarations: [AppComponent, WrapperComponent],
            providers: [GameService]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        router = TestBed.inject(Router);
        gameService = TestBed.inject(GameService);

        router.initialNavigation();
        fixture.detectChanges();
    }));

    it('Should create the app', () => {
        expect(component).withContext('App should be created').toBeTruthy();
    });

    it('Should have 1 swapi-wrapper component', () => {
        const components: DebugElement[] = debugElement.queryAll(By.css('swapi-wrapper'));

        expect(components.length).withContext('Should have only 1 swapi-wrapper component').toEqual(1);
    });

    it(`Should have 'logo-container' with 'logo' inside`, () => {
        const divs: DebugElement[] = debugElement.queryAll(By.css('.logo-container'));
        const images: DebugElement[] = debugElement.queryAll(By.css('.logo'));

        expect(divs.length).withContext(`Should be 1 'logo-container' div`).toEqual(1);
        expect(images.length).withContext(`Should be 1 'logo'`).toEqual(1);
    });

    it('Should show a logo', () => {
        const logo: DebugElement = debugElement.query(By.css('.logo'));

        expect(logo.nativeElement.src).withContext('Should show a proper logo').toContain('assets/images/svg/logo.svg');
    });

    it('Should render a home page view', () => {
        const images: DebugElement[] = debugElement.queryAll(By.css('img'));

        expect(images.length).withContext('Should be 5 images after home page is rendered').toEqual(5);
    });

    describe('navigateToHomePage method', () => {
        it('Should navigate to home page', () => {
            spyOn(router, 'navigate');

            component.navigateToHomePage();

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it(`Should call 'resetFormAndConfiguration' method from 'GameService'`, () => {
            spyOn(gameService, 'resetFormAndConfiguration');

            component.navigateToHomePage();

            expect(gameService.resetFormAndConfiguration).toHaveBeenCalled();
        });
    });
});
