import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import LatestDevice from './pages/LatestDevice'
// import superagent from 'superagent'
import LoadingMap from './components/LoadingMap'
import Map from '../Map/index'
import Datetime from 'react-datetime'
import moment from 'moment'
import axios from 'axios'


let toDate, fromDate
var config ={
  baseURL : 'https://openenvironment.p.mashape.com',
  headers: {'X-Mashape-Key':'SPmv0Z46zymshRjsWckXKsA09OBrp14RCeSjsniWIpRk6llTuk'},
};
var config1={

    baseURL1:"http://localhost:3000",
    baseURL : 'http://ec2-13-58-107-251.us-east-2.compute.amazonaws.com'
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = this.getState()
    this.changeCities = this.changeCities.bind(this);
    this.changeStates=this.changeStates.bind(this);
    this.openPanel = this.openPanel.bind(this)
    this.closePanel = this.closePanel.bind(this)
    this.changeTab = this.changeTab.bind(this)
    this.changeDisable = this.changeDisable.bind(this)
    this.realTimeData = this.realTimeData.bind(this)
    this.analyticsData = this.analyticsData.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleFromDt = this.handleFromDt.bind(this)
    this.handleToDt = this.handleToDt.bind(this)
    this.handleDtChange = this.handleDtChange.bind(this)
    this.handleDownload = this. handleDownload.bind(this)
    this.emptyDate = this.emptyDate.bind(this);
    this.changeDataUnit=this.changeDataUnit.bind(this);
  }

  getState() {
    return {
        gte: Date.now()/1000-7*86400,
        lte:Date.now()/1000,
        fromDate:"26/02/2018",
        toDate:"02/03/2018",
      markers: [],
      realTimeData: [],
      analyticsData: [],
      city: '',
      show_panel: false,
      active_tab: 'home',
      disable_tab: true,
      loading: true,
      lat: '',
      lng: '',
        id:'',
        idt:'',
      realTimedataLoading: true,
      analyticsdataLoading: true,
      city_label: '',
      device_type: '',
      time: '',
        dataUnit:"daily",
      no_records: false,
      iscity_changed: false,
      city_list: [],
        state_list:[],
      marker_id: '',
      windowWidth: '',
    }
  }




  componentDidMount() {
    let width =  window.innerWidth || documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
    this.setState({
      windowWidth: width
    });
    axios.get('/dashboard/new_device_list',config1).then(function (response) {
      if(response) {
        this.setState({loading: false, markers: response.data})
      }
    }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

    axios.get('/dashboard/get_district',config1).then(function (response) {
      if(response) {
        this.setState({city_list: response.data})
      }
    }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
      axios.get('/dashboard/get_state',config1).then(function (response) {
          if(response) {
              this.setState({state_list: response.data})
          }
      }.bind(this))
          .catch(function (error) {
              console.log(error);
          });

    // superagent.get('https://openenvironment.p.mashape.com/all/public/devices').set('X-Mashape-Key', 'SPmv0Z46zymshRjsWckXKsA09OBrp14RCeSjsniWIpRk6llTuk').end(function (err, res) {
    //   this.setState({loading: false, markers: res.body})
    // }.bind(this))
    // superagent.get('https://openenvironment.p.mashape.com/all/public/devices/citiesloc').set('X-Mashape-Key', 'SPmv0Z46zymshRjsWckXKsA09OBrp14RCeSjsniWIpRk6llTuk').end(function (err, res) {
    //   this.setState({city_list: res.body})
    // }.bind(this))

  }

  changeCities(e) {
    this.setState({city: e.target.value, iscity_changed: true})
  }

  changeDataUnit(unit){

    this.setState({dataUnit:unit},function(){

        this.analyticsData(this.state.id,this.state.idt);
    });
  }
  changeStates(e){

      this.setState({stateid: e.target.value, isstate_changed: true})

      axios.get('/dashboard/get_district?state_id='+e.target.value,config1).then(function (response) {
          if(response) {
              this.setState({city_list: response.data})
          }
      }.bind(this))
          .catch(function (error) {
              console.log(error);
          });

  }

  openPanel() {
    this.setState({show_panel: true})
  }

  closePanel() {

      this.setState({
          gte: Date.now()/1000-7*86400,
          lte: Date.now()/1000,
          dataUnit: "daily",
          fromDate: "26/02/2018",
          toDate: "02/03/2018"
      });
    this.setState({show_panel: false})
  }

  changeTab(tabName) {
    this.setState({active_tab: tabName})

  }

  changeDisable(boolean, label, deviceType) {
    this.setState({
      // disable_tab: boolean,
      // active_tab: 'realtime',
      show_panel: true,
      city_label: label,
      // device_type: deviceType
      analyticsData: [],
      realTimeData: [],
      analyticsdataLoading: true,
      realTimedataLoading: true

    })
  }

  realTimeData(id, time) {


    axios.get('/dashboard/get_device_data?id=' + id,config1).then(function (response) {
      if(response) {
        this.setState({realTimeData: response.data, marker_id : id})
          this.setState({realTimedataLoading: false})
      }
    }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

    // superagent.get('https://openenvironment.p.mashape.com/all/public/data/cur/' + id).set('X-Mashape-Key', 'SPmv0Z46zymshRjsWckXKsA09OBrp14RCeSjsniWIpRk6llTuk').end(function (err, res) {
    //   this.setState({realTimeData: res.body, time: time, marker_id : id})
    //   this.setState({realTimedataLoading: false})
    // }.bind(this))
  }

  analyticsData(id, time) {

    let lte = this.state.lte;

    let gte = this.state.gte;

    axios.get('/dashboard/get_device_data_between?id=' + id + '&gte=' + gte + '&lte=' + lte+"&unit="+this.state.dataUnit,config1).then(function (response) {
      if(response) {
          this.setState({id:id,idt:time},function(){

              this.setState({analyticsData: response.data, no_records: false})
              this.setState({analyticsdataLoading: false})

          });

      }
    }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    // superagent.get('https://openenvironment.p.mashape.com/all/public/data/range/' + id + '?gte=' + gte + '&lte=' + lte).set('X-Mashape-Key', 'SPmv0Z46zymshRjsWckXKsA09OBrp14RCeSjsniWIpRk6llTuk').end(function (err, res) {
    //   this.setState({analyticsData: res.body, time: time, no_records: false})
    //   this.setState({analyticsdataLoading: false})
    //
    // }.bind(this))


  }


  handleMarkerClick(targetMarker, index) {


      this.setState({
          markers: this.state.markers.map(marker => {
              if (marker === targetMarker) {
                  return {
                      ...marker,
                      showInfo: true
                  }
              }
              return marker;
          })
      });

  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  handleFromDt(obj) {

    fromDate = obj.format('Do/MM/YYYY')
    let gte = obj.unix()
    this.setState({gte: gte },function(){this.analyticsData(this.state.id,this.state.idt)});


  }

  handleToDt(obj) {
    toDate = obj.format('Do/MM/YYYY')
    let lte = obj.unix()
    this.setState({lte: lte },function(){this.analyticsData(this.state.id,this.state.idt)});
  }

  handleDtChange(){
    this.setState({toDate: toDate})
    this.setState({fromDate: fromDate})

  }

  emptyDate(){
    //this.setState({toDate: ''})
    //this.setState({fromDate: ''})
  }

  handleDownload(){
    if (typeof window !== 'undefined') {
      window.open(config1.baseURL+'/dashboard/issue_dump', '_self');
    }
  }
  render() {

    return (
      <div>
        {
          this.state.loading
            ?
            <div style={{marginTop: '50px'}}>
              <Navbar />
              <LoadingMap
              />
            </div>

            :
            <div>
              <Navbar />
              <section className="dashboard">
                <Map
                  markers={this.state.markers}
                  cityValue={this.state.city}
                  cityChanged={this.state.iscity_changed}
                  setDisable={this.changeDisable}
                  callRealtime={this.realTimeData}
                  callAnalytics={this.analyticsData}
                  callTimeRange={this.timeRange}
                  cities={this.state.city_list}
                  onMarkerClick={this.handleMarkerClick}
                  onMarkerClose={this.handleMarkerClose}
                />

                <div className="select-cities-box">
                  <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select" ref="cityList" className="select-cities"
                                 onChange={this.changeStates}>
                      <option value="-1">Select State</option>
                      {
                        this.state.state_list.map((element, index)=> {
                          return (
                            <option key={index} value={element.id}>{element.name}</option>
                          )
                        })
                      }

                    </FormControl>
                    <FormControl componentClass="select" placeholder="select" ref="cityList" className="select-cities"
                                 onChange={this.changeCities}>
                      <option value="">Select District</option>
                        {
                            this.state.city_list.map((element, index)=> {
                                return (
                                    <option key={index} value={index}>{element.name}</option>
                                )
                            })
                        }

                    </FormControl>
                  </FormGroup>
                </div>


                {
                  this.state.show_panel
                    ?
                    this.state.realTimedataLoading == false && this.state.analyticsdataLoading == false
                      ?
                      (

                          this.state.windowWidth > 500
                          ?
                          <div className="review-panel desktop-view">
                            <div className="panel panel-default">
                              <div className="panel-heading ">
                                <div className="row">
                                  <div className="col-sm-11 col-xs-11">
                                    <div className="col-sm-4" style={{position: 'relative'}}>
                                      <div className="inner-block">
                                        <div className="blot">

                                        </div>
                                        <span className="device-label">
                                          {this.state.realTimeData[0].label}, { this.state.realTimeData[0].city}
                                        </span>
                                        <small className="device-type">
                                            {this.state.realTimeData[0].type}
                                        </small>
                                      </div>
                                    </div>

                                    <div className="col-sm-7 dtpicker">
                                      <small>From</small><Datetime className="fromDt" timeFormat={false} onChange={this.handleFromDt}/>
                                      <small>To</small><Datetime className="toDt" timeFormat={false} onChange={this.handleToDt}/>
                                      <button onClick={this.handleDtChange}><i className="fa fa-arrow-right"></i></button>
                                    </div>
                                    <span className="download-csv" onClick={this.handleDownload}><i className="fa fa-download"></i>CSV</span>
                                  </div>
                                  <span className="col-sm-1 col-xs-1 text-right close-panel" onClick={this.closePanel}><i
                                    className="fa fa-close"></i></span>
                                </div>
                              </div>

                              <div className="panel-body">
                                <LatestDevice
                                  analysisData={this.state.analyticsData}
                                  realtimeData={this.state.realTimeData}
                                  markerId={this.state.marker_id}
                                  dataUnit={this.state.dataUnit}
                                  gte={this.state.gte}
                                  lte={this.state.lte}
                                  changeDataUnit={this.changeDataUnit}
                                  fromDate={this.state.fromDate}
                                  toDate={this.state.toDate}
                                  emptyDate = {this.emptyDate}
                                />
                              </div>

                              {/*<div className="panel-footer">
                               <ul className="review-panel-tab">
                               <a
                               onClick={() => {this.changeTab('home')}}
                               className={this.state.active_tab == 'home' ? 'active' : ''}
                               >
                               <li>
                               <img src={this.state.active_tab == 'home' ? 'assets/images/icons/home_b.png' : 'assets/images/icons/home_g.png' }/>
                               </li>
                               </a>

                               <a
                               onClick={() => {
                               this.state.disable_tab
                               ?
                               null
                               :
                               this.changeTab('realtime')
                               }}
                               className={this.state.active_tab == 'realtime' ? 'active' : ''}>
                               <li>
                               <img src={this.state.active_tab == 'realtime' ? 'assets/images/icons/realtime_b.png' : 'assets/images/icons/realtime_g.png' }/>
                               </li>
                               </a>

                               <a onClick={() => {
                               this.state.disable_tab
                               ?
                               null
                               :

                               this.changeTab('analytics')


                               }}
                               className={this.state.active_tab == 'analytics' ? 'active' : ''}>
                               <li>
                               <img src={this.state.active_tab == 'analytics' ? 'assets/images/icons/analytics_b.png' : 'assets/images/icons/analytics_g.png' }/>
                               </li>
                               </a>
                               </ul>
                               </div>*/}
                            </div>
                          </div>
                          :
                          <div className="mobile-view">
                            <div className="review-mob-panel">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <div className="row">
                                    <div className="col-xs-10">
                                      <div className="inner-block">
                                        <div className="blot">
                                          {
                                            this.state.realTimeData[0].type == 'CPCB'
                                              ?
                                              <img src="../../assets/images/CPCB.png"/>
                                              :
                                              (
                                                this.state.realTimeData[0].type == 'AIROWL3G' || this.state.realTimeData[0].type == 'AIROWLWI'
                                                  ?
                                                  <img src="../../assets/images/AIROWL3G.png"/>
                                                  :
                                                  <img src="../../assets/images/POLLUDRON_PUBLIC.png"/>

                                              )
                                          }

                                        </div>
                                          <span className="device-label">
                                            {this.state.realTimeData[0].label}, { this.state.realTimeData[0].city}, { this.state.realTimeData[0].country }
                                          </span>
                                        <small className="device-type">
                                          {this.state.realTimeData[0].type}
                                        </small>
                                      </div>
                                    </div>
                                    <div className="col-xs-2">
                                      <span className="text-right close-panel" onClick={this.closePanel}><i
                                        className="fa fa-close"></i></span>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-xs-10 dtpicker">
                                      <Datetime className="fromDt" timeFormat={false} onChange={this.handleFromDt}/>
                                      <i className="fa fa-arrow-right white"></i>
                                      <Datetime className="toDt" timeFormat={false} onChange={this.handleToDt}/>
                                      <button onClick={this.handleDtChange}><i className="fa fa-arrow-right white"></i></button>
                                    </div>
                                    <div className="col-xs-2">
                                      <span className="download-csv" onClick={this.handleDownload}><i className="fa fa-download white"></i></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body">
                                  <LatestDevice
                                    analysisData={this.state.analyticsData}
                                    realtimeData={this.state.realTimeData}

                                    markerId={this.state.marker_id}
                                    pumpId={this.state.id}
                                    fromDate={this.state.fromDate}
                                    gte={this.state.gte}
                                    lte={this.state.lte}
                                    toDate={this.state.toDate}
                                    emptyDate = {this.emptyDate}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                      )
                      :
                      null
                    :
                    null

                }
                <div className="footer">
                  <span className="pumpicon">
                    <span><img src={config1.baseURL+":8080/assets/images/pins/Up.png"} className="legend-icon" /></span>
                    <span>Pump Functional</span>
                  </span>
                  <span className="pumpicon">
                    <span><img src={config1.baseURL+":8080/assets/images/pins/Caution.png"} className="legend-icon" /></span>
                    <span>Needs Attention</span>
                  </span>
                  <span className="pumpicon">
                    <span><img src={config1.baseURL+":8080/assets/images/pins/Alarm.png"} className="legend-icon" /></span>
                    <span>Pump Off</span>
                  </span>
                  <span className="pumpicon">
                    <span><img src={config1.baseURL+":8080/assets/images/pins/Repair.png"} className="legend-icon" /></span>
                    <span>Pump Repair</span>
                  </span>
                  <span className="pumpicon">
                    <span><img src={config1.baseURL+":8080/assets/images/icons/Sensor.png"} className="legend-icon" /></span>
                    <span>Sensor Offline</span>
                  </span>
                </div>
              </section>
            </div>
        }


      </div>
    )
  }
}
