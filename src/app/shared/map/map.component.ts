import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bds-map',
  // templateUrl: './map.component.html',
  template: `
    <div fxFlex>
      <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom" [styles]="mapStyles">
        <agm-marker [latitude]="lat" [longitude]="lng" [iconUrl]="url"></agm-marker>
      </agm-map>
    </div>
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 48.933877;
  lng = 2.051790;
  zoom = 14;
  // labelOptions = {
  //   color: 'fafafa',
  //   fontFamily: 'Lato',
  //   fontSize: '12px',
  //   fontWeight: 'bold',
  //   text: ''
  // };

  mapStyles = [
    {
      featureType: 'all',
      stylers: [
        { hue: '#6200ea' },
        { saturation: -40 }
      ]
    }, {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#6200ea' },
        { saturation: 50 }
      ]
    }, {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  url = '../../../assets/map_marker.png';

  constructor() { }

  ngOnInit() {
  }

}
