import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Apiservice } from '../apiservice';
import { catchError, interval, of, Subscription, switchMap, timer } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,GoogleMapsModule,MapMarker,BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  onOff1:boolean = false;
  onOff2:boolean = false;

  isBrowser: boolean = false;
    mapOptions: google.maps.MapOptions = {
    center: { lat: 11.5053, lng: 77.2383 },
    zoom: 15
  };
  markerPosition: google.maps.LatLngLiteral = { lat: 11.5053, lng: 77.2383};

  constructor(private api:Apiservice) {}

  private locationSubscription!: Subscription;
  
  onClick1(){
    this.onOff1 = !this.onOff1;
    this.api.postLock({sideLock:this.onOff1,emergencyLock:this.onOff2}).subscribe((err)=>{console.log(err);
    })
  }
  onClick2(){
    this.onOff2 = !this.onOff2;
    this.api.postLock({sideLock:this.onOff1,emergencyLock:this.onOff2}).subscribe((err)=>{console.log(err);
    })
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: false,                 
        tension: 0,                   
        borderColor: 'red',  
        borderWidth: 1,          
        backgroundColor: 'transparent'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

    ngOnInit() {
      this.locationSubscription = interval(5000).pipe(switchMap(() => this.api.getLocation())).subscribe( 
        (data) => { console.log('API response:', data); 
          this.markerPosition = { lat: data.latitude, lng: data.longitude };
          this.mapOptions = { ...this.mapOptions, center: this.markerPosition };
        }, 
        (error) => { console.error('API error:', error); 
        } );
    }

  ngOnDestroy(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }
}
