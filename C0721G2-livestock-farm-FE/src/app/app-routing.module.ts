import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'cages',
    loadChildren: () => import('./component/cages/cages.module').then(module => module.CagesModule),
  },
  {
    path: 'employee',
    loadChildren: () => import('./component/employee/employee.module').then(module => module.EmployeeModule),
  },
  {
    path: 'news',
    loadChildren: () => import('./component/news/news.module').then(module => module.NewsModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./component/security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'individual',
    loadChildren: () => import('./component/individual/individual.module').then(module => module.IndividualModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
