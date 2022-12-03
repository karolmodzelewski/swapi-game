import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { WideButtonComponent } from '../../components/wide-button/wide-button.component';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { CardComponent } from './components/card/card.component';
import { PersonComponent } from './components/card/person/person.component';
import { StarshipComponent } from './components/card/starship/starship.component';
import { LoadingStateComponent } from '../../components/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../components/error-state/error-state.component';
import { ResultsPopupComponent } from './components/results-popup/results-popup.component';
import { ResultHeadingComponent } from './components/results-popup/components/result-heading/result-heading.component';

@NgModule({
    declarations: [GameComponent, CardComponent, PersonComponent, StarshipComponent, ResultsPopupComponent, ResultHeadingComponent],
    imports: [CommonModule, GameRoutingModule, HttpClientModule, MatCardModule, LoadingStateComponent, ErrorStateComponent, MatButtonModule, WideButtonComponent, MatDialogModule, MatIconModule],
    exports: [CardComponent],
})
export class GameModule {}
