import React, {Component} from 'react';
import Datetime from 'react-datetime';

export default class ViewPumpStats extends Component {

  constructor(props) {
    super(props)
    this.state = {
        gte: Date.now()/1000-7*86400,
        lte:Date.now()/1000,
        googleSheetUrl: '',
    };
    this.handleFromDt = this.handleFromDt.bind(this);
    this.handleToDt = this.handleToDt.bind(this);
    this.handleDtChange = this.handleDtChange.bind(this);
  }

  componentDidMount() {
      this.setState({ googleSheetUrl: this.props.googleSheetUrl });
  }

  handleFromDt(obj) {
    this.setState({ gte: obj.unix() });
  }

  handleToDt(obj) {
    this.setState({ lte: obj.unix() });
  }

  handleDtChange() {
    console.log('API call to fetch the update Google Sheet URL', this.state.gte, this.state.lte);
  }

  render() {
    const { googleSheetUrl } = this.state;
    return (
      <div>

        <div className="view-pump-stats">
            <div className="filter-by-date">
                <div className="data-table">Data Table</div>
                <div className="dtpicker">
                    <Datetime className="fromDt" timeFormat={false} onChange={this.handleFromDt}/>
                    <i className="fa fa-arrow-right white"></i>
                    <Datetime className="toDt" timeFormat={false} onChange={this.handleToDt}/>
                    <button onClick={this.handleDtChange}><i className="fa fa-arrow-right white"></i></button>
                </div>
                <button
                    className="download"
                >
                    Download Report
                </button>
            </div>
            <div className="google-sheet-iframe">
                <iframe src={googleSheetUrl} width="100%" height="250px">
                </iframe>
            </div>
        </div>
      </div>
    )
  }
};