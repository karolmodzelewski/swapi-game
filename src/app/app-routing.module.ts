import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameGuard } from './guards/game.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home-page/home-page.module').then((m) => m.HomePageModule),
    },
    {
        path: 'game',
        loadChildren: () => import('./features/game/game.module').then((m) => m.GameModule),
        canActivate: [GameGuard],
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
