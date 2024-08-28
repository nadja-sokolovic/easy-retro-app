import { ReportsComponent } from './components/reports/reports.component';
import { StoriesCompetitionComponent } from './components/stories-competition/stories-competition.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: 'dashboard' },
  { path: 'dashboard', component: NavbarComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'actions' },
      { path: 'actions', component: ActionsComponent },
      { path: 'stories-competition', component: StoriesCompetitionComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
