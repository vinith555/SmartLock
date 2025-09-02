import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Apiservice } from '../apiservice';
import { interval, map, Subscription, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import * as maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,GoogleMapsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  onOff1:boolean = false;
  onOff2:boolean = false;
  private map!: maplibregl.Map;
  private marker!: maplibregl.Marker;
  private isBrowser: boolean;

  center = signal({ lat: 11.5053, lng: 77.2383 });

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; 

    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [this.center().lng, this.center().lat],
      zoom: 10
    });

    this.marker = new maplibregl.Marker()
      .setLngLat([this.center().lng, this.center().lat])
      .addTo(this.map);

    interval(10000)
      .pipe(switchMap(() => this.api.getLocation()))
      .pipe(map(data => ({ lat: data.latitude, lng: data.longitude })))
      .subscribe(coords => {
        this.center.set(coords);
        this.marker.setLngLat([coords.lng, coords.lat]);
        this.map.setCenter([coords.lng, coords.lat]);
      });
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object,private api:Apiservice) {this.isBrowser = isPlatformBrowser(platformId);}

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

    

  ngOnDestroy(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }
}
