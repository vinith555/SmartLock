import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
}
