import {Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {FeaturesComponent} from './components/features/features.component';

export const INFO_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/about',
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About',
    },
  },
  {
    path: 'features',
    component: FeaturesComponent,
    data: {
      title: 'Features',
    },
  }
];
