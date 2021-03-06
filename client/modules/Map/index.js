import React, {Component} from 'react'
import mapStyle from '../Dashboard/Mapstyle.json'

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {lat: 22.400304 , lng: 88.285201, zoom: 15, cityChanged: this.props.cityChanged}
    this.renderMarkers = this.renderMarkers.bind(this)
    this.renderInfoWindow = this.renderInfoWindow.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    //updating center of map on dropdown change
    if (this.props.cityValue != nextProps.cityValue) {
      this.setState({cityChanged: nextProps.cityChanged})
      if (nextProps.cities[nextProps.cityValue] != undefined) {

        let nextLatitude  =  nextProps.cities[nextProps.cityValue].latitude
        let nextLongitude =  nextProps.cities[nextProps.cityValue].longitude
        this.map.setCenter({lat: nextLatitude, lng: nextLongitude})
        this.map.setZoom(15)
      } else {
        this.map.setCenter({lat: 22.400304 , lng: 88.285201})
        this.map.setZoom(15)
      }
    }
  }

  mapCenterLatLng() {
    return new google.maps.LatLng(22.400304  , 88.285201);
  }

  renderMarkers(markers, map) {
    var infowindow = new google.maps.InfoWindow();
    let pins = markers.map((marker)=> {
      let loc = new google.maps.LatLng(marker.latitude, marker.longitude);
      let pin = new google.maps.Marker({
        position: loc,
        map: map,
        icon: this.getMarkerImage(marker.pumpConditionBucket)
      });
      pin.addListener('mouseover',function () {
        infowindow.setContent(this.renderInfoWindow(marker));
        infowindow.open(pin.get('map'), pin);
      }.bind(this))
      pin.addListener('click',function () {
          this.props.setDisable(false,  marker.loc, marker.deviceType);
          this.props.callRealtime(marker.deviceId, marker.t);
          this.props.callAnalytics(marker.deviceId, marker.t)
      }.bind(this));
      return pin
    });


    //render cluster
    var markerCluster = new MarkerClusterer(this.map, pins);

  }

  renderInfoWindow(marker) {
   var html ='<div class="infowindow-content">'
            +'<div class="infowindow-head">'
            +'<strong>'+marker.label+'</strong>'
            +'<span id="info-window-head-uptime">Uptime : '+marker.payload.uptime+'</span>'
            +'</div>'
            +'<span id="info-window-head-last-updated">'+this.displayTime(marker.payload.d.t)+'</span>'
       +'<div class="infowindow-body">'
            +'<div class="left-content">'
            +'<div><i class="fa fa-circle pump '+marker.pumpConditionBucket+'" aria-hidden="true"></i>'+marker.pumpCondition+'</div>'
            +'<div>' +
       '<i class="fa fa-water_consumption"></i>'+marker.waterConsumption +
       '<span style="margin-left: 20px;"><i class="fa fa-people_used" aria-hidden="true" style="color: #73C076;"></i>'+marker.peopleUsed+'</span>'+
       '<span style="margin-left: 20px;"><i class="fa fa-usage" aria-hidden="true" style="color: #73C076;"></i>'+marker.usage+'</span>' +
       '<span style="margin-left: 20px;"><i class="fa fa-water_level" aria-hidden="true" style="color: #73C076;"></i>'+marker.waterLevel+'</span>'+
       '</div>'
            +'</div></div></div>'
            return html;
  }

  getIndoor(device){
    if(device == 'AIROWLWI' || device == 'AIROWL3G'){
      return 'Indoor'
    }
    else{
      return 'Outdoor'
    }
  }

  getClass250(aqi){
    if(aqi > 250){
      return 'gt-250'
    }
    else {
      return ''
    }

  }

  renderClass(aqi){
    if (aqi <= 50) {
      return 'good'
    }
    else if (aqi > 50 && aqi < 101) {
      return 'satisfactory'
    }
    else if (aqi > 100 && aqi < 201) {
      return 'moderate'
    }
    else if (aqi > 200 && aqi < 301) {
      return 'poor'
    }
    else if (aqi > 300 && aqi < 401) {
      return 'very-poor'
    }
    else {
      return 'severe'
    }
  }

  getMarkerImage(pumpConditionBucket) {
    //rendering images as per aqi's valye
    if (pumpConditionBucket =="satisfactory") {
      return 'assets/images/pins/Up.png'
    }
    else if (pumpConditionBucket=="fair") {
      return 'assets/images/pins/Caution.png'
    }
    else if (pumpConditionBucket=="offline"){

        return 'assets/images/pins/Sensor.png'
    }
    else{
      return 'assets/images/pins/Alarm.png'
    }
  }

  getDegree(aqi){
      var percent = aqi,
      deg = 360*percent/500;
    return {percent: percent,deg: deg};
  }

  componentDidMount() {

    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: this.state.zoom,
      styles: mapStyle,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    {
      this.renderMarkers(this.props.markers, this.map)
    }
    this.setState({map: this.map});
  }

  render() {
    return (
      <div ref="map" style={{height: '89.5vh',width: '100%'}}>
      </div>
    )
  }

    displayTime(unixtime) {
        let a = new Date(unixtime * 1000)

        var year = a.getFullYear().toString().substr(2, 2);
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();


        if (min<=9){

          min="0"+min;
        }
        var ampm = hour >= 12 ? 'PM' : 'AM'

        if (hour>12){

          hour=hour-12;
        }
        if (hour<=9){

            hour="0"+hour;
        }
        let displayTime = date + "/" + month + "/" + year+" "+hour+":"+min+" "+ampm;
        return displayTime
    }
}
