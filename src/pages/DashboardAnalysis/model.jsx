import { getMonitorInfoList } from './service';

const initState = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineTitleMap:{
    Voltage:'电压',
    Current:'电流',
    Power:'功率'
  },
  tags:[{
    code:'Voltage',
    name:'电压',
    checked:false
  },{
    code:'Current',
    name:'电流',
    checked:false
  },{
    code:'Power',
    name:'功率',
    checked:false
  }],
  offlineChartData: [
    {
        "x":1579529828999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579531628999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579533428999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579535228999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579537028999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579538828999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579540628999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579542428999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579544228999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579546028999,
        "Voltage":15,
        "Current":103,
        "Power":33
    },
    {
        "x":1579547828999,
        "Voltage":15,
        "Current":103,
        "Power":33
    }
],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
 
};
const Model = {
  namespace: 'dashboardAnalysis',
  state: initState,
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getMonitorInfoList,payload);
     /*  yield put({
        type: 'save',
        payload: response,
      }); */
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return initState;
    },
  },
};
export default Model;
