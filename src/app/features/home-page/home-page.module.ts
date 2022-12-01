import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { WideButtonComponent } from './../../components/wide-button/wide-button.component';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ResourceComponent } from './components/resource/resource.component';
import { ScoreComponent } from './components/score/score.component';
import { AttributeComponent } from './components/attribute/attribute.component';

@NgModule({
    declarations: [HomePageComponent, ResourceComponent, ScoreComponent, AttributeComponent],
    imports: [CommonModule, HomePageRoutingModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, WideButtonComponent],
})
export class HomePageModule {}
