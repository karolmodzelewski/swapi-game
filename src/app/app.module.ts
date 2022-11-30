import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperFixtureComponent } from './components/wrapper/fixtures/wrapper-fixture.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
    declarations: [AppComponent, WrapperComponent, WrapperFixtureComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
