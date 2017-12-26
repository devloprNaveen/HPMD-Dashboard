import React, {Component} from 'react'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import moment from 'moment'
// import superagent from 'superagent'
import _ from 'lodash'
import axios from 'axios'


var config ={
  baseURL : 'localhost:3000',
};
var config1={

    baseURL1:"http://localhost:3000",
    baseURL : 'http://ec2-18-220-175-111.us-east-2.compute.amazonaws.com'
};

let arr = {'AQI': []}, newTime, chart, diffDayArray = [], changedTimeArray = [];

let changeData = false

export default class GraphView extends Component {

  constructor(props) {
    super(props)
    // this.maxAqi = this.maxAqi.bind(this)

    this.state = {
      aqiArray: {'waterConsumption': [], 'peopleUsed': [], 'usage': []},
      chartList: ['waterConsumption', 'peopleUsed', 'usage'],
      gasesInfo: 'waterConsumption',
      dump:false
    };
    this.displayGraph = this.displayGraph.bind(this)
      this.changeDataUnit=this.changeDataUnit.bind(this);
    this.renderChartOnData = this.renderChartOnData.bind(this)
  }

  componentDidMount() {

    if (this.props.analysisData.length > 0) {
      let temp = this.state.aqiArray
      let todayDt = parseInt(new Date().getTime() / 1000)
      this.props.analysisData.map((e) => {
        let a = (19800 + parseInt(e.payload.d.t)) * 1000;

        temp.waterConsumption.unshift([a, e.payload.d.waterConsumption])
        temp.peopleUsed.unshift([a, e.payload.d.peopleUsed])
        temp.usage.unshift([a, e.payload.d.usage])


      })
      this.setState({
        aqiArray: temp
      });

      chart = Highcharts.chart(this.refs.highchart, {
        chart: {
          backgroundColor: 'transparent',
          // width: 600,
          height: 300,
          type: 'column',
        },
        colors: ['#00b3bf'],

        title: {
          text: 'Analytics',
          style: {
            color: 'white',
            fontSize: '14px'
          }
        },

        legend: {
          enabled: false
        },

        credits: {
          enabled: false
        },

        global: {
          useUTC: false
        },

        xAxis: {
          gridLineColor: '#2b313a',
          gridLineWidth: 1,
          type: 'datetime',
          labels: {
            style: {
              color: '#FFF'
            }
          }
        },

        yAxis: {
          gridLineWidth: 1,
          gridLineColor: '#2b313a',
          labels: {
            style: {
              color: '#FFF'
            },
          },
          title: {
            text: null
          }
        },

        series: [
          {
            name: 'waterConsumption',
            data: this.state.aqiArray.waterConsumption,
            fillColor: 'rgba(255,255,255, 0.1)',
            marker: {
              enabled: false
            }
          },
          {
            name: 'usage',
            data: this.state.aqiArray.usage,
            fillColor: 'rgba(255,255,255, 0.1)',
            marker: {
              enabled: false
            },
            visible: false
          },
          {
            name: 'peopleUsed',
            data: this.state.aqiArray.peopleUsed,
            fillColor: 'rgba(255,255,255, 0.1)',
            marker: {
              enabled: false
            },
            visible: false
          }
        ],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },


          }]
        },
      })
    }
  }

  componentWillUnmount() {
    this.props.emptyDate()
  }

  // sortedPush( timeArray, value ) {
  //   timeArray.splice( _.sortedIndex( timeArray, value ), 0, value );
  //   return timeArray;
  // }

  renderChartOnData(Data) {
    chart = Highcharts.chart(this.refs.highchart, {
      chart: {
        backgroundColor: 'transparent',
        // width: 600,
        height: 300,
        type: 'column',
      },
      colors: ['#00b3bf'],

      title: {
        text: 'Analytics',
        style: {
          color: 'white',
          fontSize: '14px'
        }
      },

      legend: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      xAxis: {
        gridLineColor: '#2b313a',
        gridLineWidth: 1,
        type: 'datetime',
        labels: {
          style: {
            color: '#FFF'
          }
        }
      },

      yAxis: {
        gridLineWidth: 1,
        gridLineColor: '#2b313a',
        labels: {
          style: {
            color: '#FFF'
          },
        },
        title: {
          text: null
        }
      },

      series: [
        {
          name: 'water consumption',
          data: Data.waterConsumption,
          fillColor: 'rgba(255,255,255, 0.1)',
          marker: {
            enabled: false
          }
        },
        {
          name: 'usage',
          data: Data.usage,
          fillColor: 'rgba(255,255,255, 0.1)',
          marker: {
            enabled: false
          },
          visible: false
        },
        {
          name: 'peopleUsed',
          data: Data.peopleUsed,
          fillColor: 'rgba(255,255,255, 0.1)',
          marker: {
            enabled: false
          },
          visible: false
        }
      ],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },

        }]
      },
    })
  }

  componentWillReceiveProps(nextProps) {
      this.setState({gte:nextProps.gte,lte:nextProps.lte});
    if (true || this.props.fromDate != nextProps.fromDate || this.props.toDate != nextProps.toDate) {
      var diff = moment(nextProps.toDate, "DD/MM/YYYY").diff(moment(nextProps.fromDate, "DD/MM/YYYY"))
      diff = moment.duration(diff)
      var diffN = diff.asDays()
      if (diff.asDays() > 0) {
        diffDayArray = []
        for (let i = 0; i <= diffN; i++) {
          var incre = moment(nextProps.fromDate, "DD-MM-YYYY").add(i, 'days');
          diffDayArray.push((19800 + incre.unix()) * 1000);
        }

        let Data = [];
        if (diffN >= 3) {
          let lte = nextProps.lte;
          let today = new Date()
          let gte = nextProps.gte;
          axios.get('/dashboard/get_device_data_between?unit='+nextProps.dataUnit+'&id=' + this.props.id + '&gte=' + gte + '&lte=' + lte,config1).then(function (res) {
            Data = res.data

            let aqiArray = {'waterConsumption': [], 'peopleUsed': [], 'usage': []}
            Data.map((e) => {
              let a = (19800 + parseInt(e.payload.d.t)) * 1000;

              aqiArray.waterConsumption.unshift([a, e.payload.d.waterConsumption])
              aqiArray.peopleUsed.unshift([a, e.payload.d.peopleUsed])
              aqiArray.usage.unshift([a, e.payload.d.usage])
            })
            this.setState({aqiArray: aqiArray})
            this.renderChartOnData(aqiArray)
          }.bind(this))
        }
        else {
          Data = this.props.analysisData;
          let from = nextProps.gte*1000;
          let to = nextProps.lte*1000;
          let temp = {'waterConsumption': [], 'peopleUsed': [], 'usage': []}
          Data.map((e) => {
            // // let xaxis = (19800 + parseInt(e.payload.d.t))*1000;
            // let date = moment.unix(e.payload.d.t).format('Do/MM/YYYY');
            // let a = (19800 + moment(date, 'DD/MM/YYYY').unix())*1000;
            // changedTimeArray = this.sortedPush(changedTimeArray, a);

            let a = (19800 + parseInt(e.payload.d.t)) * 1000;
            if (a < to && a > from) {
              temp.waterConsumption.unshift([a,e.payload.d.waterConsumption])
              temp.peopleUsed.unshift([a,e.payload.d.peopleUsed])
              temp.usage.unshift([a,e.payload.d.usage])
            }
          });
          this.setState({aqiArray: temp})
          this.renderChartOnData(temp)
        }
      }
    }

  }

  displayGraph(tabName) {
    this.state.chartList.map((e)=> {
      if (tabName === e) {
        document.getElementById(tabName).className = 'active'
      }
      else {
        document.getElementById(e).className = ''
      }
    });

    chart.series.map((e)=> {
      if (e.name == tabName) {
        e.setVisible(true)
      }
      else {
        e.setVisible(false)
      }
    });


      this.setState({gasesInfo : tabName});
  }

  changeDataUnit(unit){

    this.props.changeDataUnit(unit);
  }
  render() {

    return (
      <div >
        <div className="analytics-div">
          <ul className="chart-list list-inline" id="class-list1">
            <li id="daily" onClick={()=>this.changeDataUnit("daily")} className={this.props.dataUnit=="daily"?"active":""}>DAILY</li>
            <li id="weekly" onClick={()=>this.changeDataUnit("weekly")} className={this.props.dataUnit=="weekly"?"active":""}>WEEKLY</li>
            <li id="monthly" onClick={()=>this.changeDataUnit("monthly")} className={this.props.dataUnit=="monthly"?"active":""}>MONTHLY</li>
          </ul>
          <div className="analytics-chart">
            {
              Object.keys(this.state.aqiArray).length > 0
                ?
                <div ref="highchart"></div>
                :
                null
            }
            <ul className="chart-list list-inline" id="c-list">
              {
                this.state.chartList.map((list, index)=> {
                  return (
                    <li
                      onClick={()=>{this.displayGraph(list)}}
                      id={list}
                      key={list}
                      className={index===0 ? 'active' : ''}
                    >{list == 'waterConsumption' ? "VOLUME" : list=="peopleUsed"?"USERS":list=="usage"?"OPERATING HRS":list}</li>
                  )
                })
              }
            </ul>


            <div className="chart-btn-group">
              <a
                className={this.props.activeGraph == 'graphview' ? 'active' : ''}
                onClick={() => {this.props.changeGraphData('graphview')}}
              >
                <img src="../../../assets/images/icons/analytics_w.png"/>
              </a>
              <a
                className={this.props.activeGraph == 'calendarview' ? 'active' : ''}
                onClick={() => {this.props.changeGraphData('calendarview')}}
              >

                <img src="./../../assets/images/calendar_w.png"/>
              </a>
            </div>
          </div>

          <div className="chart-description">
            <DropdownButton title={this.state.gasesInfo=="waterConsumption"?"VOLUME":
                this.state.gasesInfo=="peopleUsed"?"USERS":
                    this.state.gasesInfo=="usage"?"OPERATING HRS":this.state.gasesInfo
            } id="chart-info-dropdown">
              <MenuItem eventKey="1" onSelect={()=>{this.setState({gasesInfo : 'waterConsumption'});this.displayGraph("waterConsumption");}}>VOLUME</MenuItem>
              <MenuItem eventKey="2" onSelect={()=>{this.setState({gasesInfo : 'peopleUsed'});this.displayGraph("peopleUsed");}}>USERS</MenuItem>
              <MenuItem eventKey="3" onSelect={()=>{this.setState({gasesInfo : 'usage'});this.displayGraph("usage");}}>OPERATING HRS</MenuItem>

            </DropdownButton>
            {
              this.state.gasesInfo == 'waterConsumption'
                ?
                <div className="gases-info">
                  <p>

                    Water Consumption gives hourly details of total water consumed.
                  </p>
                </div>
                :
                (
                  this.state.gasesInfo == 'peopleUsed'
                    ?
                    <div className="gases-info">
                      People used gives information on number of people using pump.
                    </div>
                    :
                    (
                      this.state.gasesInfo == 'usage'
                        ?
                        <div className="gases-info">
                          Usage is total amount of time pump was used.
                        </div>

                                    :
                                    null
                                )



                )
            }

          </div>
        </div>
      </div>
    )
  }
}
