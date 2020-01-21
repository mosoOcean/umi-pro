import { Col, Dropdown, Icon, Menu, Row, DatePicker, Select } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import moment from 'moment';
import TreeSearch from './TreeSearch';
import TagCheckable from './TagCheckable';
const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));
const { RangePicker } = DatePicker;
const { Option } = Select;

class DashboardAnalysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    timeList: [
      {
        name: '5分钟',
        code:'FiveMin',
        value: 5 * 60,
      },
      {
        name: '10分钟',
        code:'TenMin',
        value: 10 * 60,
      },
      {
        name: '15分钟',
        code:'FifteenMin',
        value: 15 * 60,
      },
      {
        name: '30分钟',
        code:'Halfhour',
        value: 30 * 60,
      },
      {
        name: '1小时',
        code:'Hour',
        value: 60 * 60,
      },
      {
        name: '4小时',
        code:'FourHour',
        value: 4 * 60 * 60,
      },
      {
        name: '8小时',
        code:'EightHour',
        value: 8 * 60 * 60,
      },
      {
        name: '12小时',
        code:'TwelveHour',
        value: 12 * 60 * 60,
      },
      {
        name: '1天',
        code:'Day',
        value: 24 * 60 * 60,
      },
    ],
    seleted: [
      {
        name: '5分钟',
        code:'FiveMin',
        value: 5 * 60,
      },
      {
        name: '10分钟',
        code:'TenMin',
        value: 10 * 60,
      },
      {
        name: '15分钟',
        code:'FifteenMin',
        value: 15 * 60,
      },
      {
        name: '30分钟',
        code:'Halfhour',
        value: 30 * 60,
      },
    ],
  };
  reqRef = 0;
  timeoutId = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAnalysis/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAnalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };
  onChange = (dates, dateStrings) => {
    console.log(dates, dateStrings);
    console.log('From: ', dates[0].valueOf(), ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    let num = 1500;
    let startTime = dates[0].valueOf();
    let endTime = dates[1].valueOf();
    let threshold = (endTime - startTime) / 1000 / num;
    let { dispatch } = this.props;
    let { timeList } = this.state;
    let seleted = [];
    timeList.map(item => {
      if (item.value > threshold) {
        seleted.push(item);
      }
    });
    let datNum = Math.ceil((endTime - startTime) / 1000 / seleted[0].value);
    dispatch({
      type: 'dashboardAnalysis/save',
      payload: {
        seleted: seleted,
        seletValue: seleted[0].name,
        startTime: startTime,
        endTime: endTime,
        datNum: datNum,
      },
    });
  };
  handleChange = (value, option) => {
    debugger
    let { dispatch, dashboardAnalysis } = this.props;
    let { startTime, endTime } = dashboardAnalysis;
    let datNum = Math.ceil((endTime - startTime) / 1000 / Number(value.key));
    dispatch({
      type: 'dashboardAnalysis/save',
      payload: {
        seletValue: value.label,
        datNum: datNum,
      },
    });
  };
  handleTagSelect=(code,checked)=>{
    console.log(code,checked)
    let { dispatch, dashboardAnalysis } = this.props;
    let { startTime, endTime,seletValue } = dashboardAnalysis;
    if(checked){
      dispatch({
        type: 'dashboardAnalysis/fetch',
        payload: {
          meterId:1,
          startTime,
          endTime,
          dataType:code,
          timespanType:seletValue,
        },
      })
    }
   
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { dashboardAnalysis, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      tags,
      offlineTitleMap,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      seleted = [
        {
          name: '5分钟',
          code:'FiveMin',
          value: 5 * 60,
        },
        {
          name: '10分钟',
          code:'TenMin',
          value: 10 * 60,
        },
        {
          name: '15分钟',
          code:'FifteenMin',
          value: 15 * 60,
        },
        {
          name: '30分钟',
          code:'Halfhour',
          value: 30 * 60,
        },
      ],
      seletValue,
      datNum = 0,

    } = dashboardAnalysis;
    return (
      <GridContent>
      
        <Row className={styles.dashboard}>
          <Col span={6} className={styles.dashboard__tree}>
            <TreeSearch />
          </Col>
          <Col span={18} className={styles.dashboard__chart}>
            <Row>
              <Col span={12}>
                时间：
                <RangePicker
                  showTime
                  ranges={{
                    今天: [moment(), moment()],
                    本月: [moment().startOf('month'), moment().endOf('month')],
                  }}
                  onChange={this.onChange}
                />
              </Col>
              <Col span={12}>
                间隔：
                <Select
                  labelInValue
                  value={{
                    key: seletValue || seleted[0].name,
                  }}
                  style={{
                    width: 120,
                  }}
                  onChange={this.handleChange}
                >
                  {seleted.map(item => {
                    return <Option value={item.value}>{item.name}</Option>;
                  })}
                </Select>
              </Col>
            </Row>
            <TagCheckable tags={tags} onSelect={this.handleTagSelect}/>
            <Row>
              <React.Fragment>
                <Suspense fallback={null}>
                  <OfflineData loading={loading} offlineChartData={offlineChartData} offlineTitleMap={offlineTitleMap} />
                </Suspense>
              </React.Fragment>
            </Row>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(({ dashboardAnalysis, loading }) => ({
  dashboardAnalysis,
  loading: loading.effects['dashboardAnalysis/fetch'],
}))(DashboardAnalysis);
