import React, {Component} from 'react'
import GraphView from './GraphView'
import CalendarView from './CalendarView'
import superagent from 'superagent'
import Popover from 'react-bootstrap/lib/Popover'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

export default class LatestDevice extends Component {

  constructor(props) {
    super(props)
    this.state = {activeGraph: 'graphview', limits: [], dataLoaded:false}
    this.changeGraphData = this.changeGraphData.bind(this)
    this.displayTime = this.displayTime.bind(this)
    this.getLimits = this.getLimits.bind(this)
    this.closePopover = this.closePopover.bind(this)

  }

  componentDidMount(){



  }

  componentWillUnmount(){
     this.props.emptyDate()
  }



  displayTime() {
    let a = new Date(this.props.realtimeData[0].payload.d.t * 1000)

    var year = a.getFullYear().toString().substr(2, 2);
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (min<=9){

        min="0"+min;
    }
    var ampm = hour >= 12 ? 'PM' : 'AM';

    if (hour>12){
        hour=hour-12;
    }
    if (hour<=9){

        hour="0"+hour;
    }

    let displayTime = hour + ':' + min + " " + ampm + " " + date + "-" + month + "-" + year;
    return displayTime
  }

  getLimits(data, key){
    let name,  obj = {};
    this.state.limits.map((e)=>{
      // console.log(e)
      if(e.fkey == key){
          if (data > e.max) {
            obj.class = 'gt-50';
          }
          else {
            obj.class = ''
          }
          var percent = data
          var deg = 360 * percent / (e.max * 2);
          obj.percent = percent;
          obj.deg = deg;
          // console.log("obj", obj)

      }

    })
    return obj;
    // let obj = {};
    //   if (data > 25) {
    //     obj.class = 'gt-50';
    //   }
    //   var percent = data
    //   var deg = 360 * percent;
    //   obj.percent = percent;
    //   obj.deg = deg;
    //   console.log(obj)
    //   return obj;
  }

  // getCODegree(co) {
  //   let obj = {};
  //   if (co > 25) {
  //     obj.class = 'gt-50';
  //   }
  //   var percent = co, deg = 360 * percent / 50;
  //   obj.percent = percent;
  //   obj.deg = deg;
  //   return obj;
  // }
  //
  // getSODegree(so) {
  //   let obj = {};
  //   if (so > 800) {
  //     obj.class = 'gt-50';
  //   }
  //   var percent = so,
  //     deg = 360 * percent / 1600;
  //   obj.percent = percent;
  //   obj.deg = deg;
  //   return obj;
  // }
  //
  // getNODegree(no) {
  //   let obj = {};
  //   if (no > 250) {
  //     obj.class = 'gt-50';
  //   }
  //   var percent = no,
  //     deg = 360 * percent / 500;
  //   obj.percent = percent;
  //   obj.deg = deg;
  //   return obj;
  // }
  //
  // getPM10Degree(pm10) {
  //   let obj = {};
  //   if (pm10 > 215) {
  //     obj.class = 'gt-50';
  //   }
  //   var percent = pm10,
  //     deg = 360 * percent / 430;
  //   obj.percent = percent;
  //   obj.deg = deg;
  //   return obj;
  // }
  //
  // getPM25Degree(pm25) {
  //   let obj = {};
  //   if (pm25 > 125) {
  //     obj.class = 'gt-50';
  //   }
  //   var percent = pm25,
  //     deg = 360 * percent / 250;
  //   obj.percent = percent;
  //   obj.deg = deg;
  //   return obj;
  // }

  changeGraphData(graph){
    this.setState({activeGraph : graph})
  }

  closePopover(){
    this.refs.overlay.hide();
  }
  render() {
    let latestDevice = this.props.realtimeData[0];
    let iframeSrc = 'http://openenvironment.indiaopendata.com/iframe?devices='
    const popoverTop = (
      <Popover id="popover-positioned-bottom" className="iframe-popover" title={latestDevice.label}>
        <i className="fa fa-close closePopover" onClick={this.closePopover}></i>
        <pre>
          &lt;iframe src={iframeSrc+latestDevice.deviceId} &gt;&lt;/iframe&gt;
        </pre>
        <iframe src={iframeSrc+latestDevice.deviceId} width="1000px" height="300px"></iframe>
      </Popover>
    );
    return (
      <div className="dashboard-home">
        <div className="row">
          <div className="col-sm-4 col-xs-12 remove-padding text-center" style={{padding: '30px 0px 30px 20px', position: 'relative'}}>
            <div className="aqi-status">

              <strong className={latestDevice.pumpConditionBucket}>
                  {latestDevice.pumpCondition}
              </strong>


              <div className="last-updated">
                <span>Last Updated: {this.displayTime()}</span>
              </div>
                <div class="infowindow-body">
                <div class="left-content">
                    <div>
                       <div className="icon_desc_small_box" style={{marginLeft: "0px",marginTop:"30px"}}><i className="fa fa-water_consumption" style={{color: "#73C076"}}></i> <br />{latestDevice.payload.d.waterConsumption}L</div>
                        <div className="icon_desc_small_box" style={{marginLeft: "20px"}}><i className="fa fa-people_used" style={{color: "#73C076"}}></i><br />{latestDevice.payload.d.peopleUsed}</div>
                        <div className="icon_desc_small_box" style={{marginLeft: "20px"}}><i className="fa fa-usage"  style={{color: "#73C076"}}></i><br />{latestDevice.payload.d.usage}h</div>
                        </div>
                    </div></div>
            </div>

          </div>
          <div className="col-sm-8 col-xs-12 remove-padding" style={{padding: '20px'}}>
            {
              this.state.activeGraph === 'graphview'
              ?
                <GraphView
                  analysisData={this.props.analysisData}
                  time={this.props.realtimeData[0].payload.d.t}
                  activeGraph = {this.state.activeGraph}
                  changeGraphData = {this.changeGraphData}
                  fromDate={this.props.fromDate}
                  changeDataUnit={this.props.changeDataUnit}
                  dataUnit={this.props.dataUnit}
                  gte={this.state.gte}
                  lte={this.state.lte}
                  toDate={this.props.toDate}
                  id={this.props.markerId}
                  emptyDate = {this.props.emptyDate}
                />
              :
                <CalendarView
                  changeGraphData = {this.changeGraphData}
                  activeGraph = {this.state.activeGraph}
                  markerId={this.props.markerId}
                  pumpId={this.props.pumpId}
                />
            }

          </div>
        </div>
      </div>
    )
  }
};


