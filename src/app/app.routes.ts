import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'notes', component: NotesListComponent }
];
