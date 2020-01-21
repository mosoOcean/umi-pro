import { Card, Col, Row } from 'antd';
import React from 'react';
import { TimelineChart} from './Charts';
import styles from '../style.less';
const OfflineData = ({ loading, offlineChartData,offlineTitleMap }) => (

  <Card
    loading={loading}
    className={styles.offlineCard}
    bordered={false}
    style={{
      marginTop: 32,
    }}
  >
    <TimelineChart
      height={400}
      data={offlineChartData}
      titleMap={offlineTitleMap}
    />
  </Card>
);

export default OfflineData;
