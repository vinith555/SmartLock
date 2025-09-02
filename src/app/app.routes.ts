import { Routes } from '@angular/router';
import path from 'node:path';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';

export const routes: Routes = [
    {path:'',component:Home,children:[
        {path:'',component:Dashboard},
        {path:'about',component:About}
    ]}
];
