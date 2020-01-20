import { PageHeaderWrapper } from "@ant-design/pro-layout"
import React, { useState, useEffect } from "react"
import { Spin } from "antd"
import styles from "./index.less"
import TreeSearch from "./TreeSearch"
import ListTableList from "./ListTableList"
export default () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  return (
    <PageHeaderWrapper className={styles.main}>
      <Spin spinning={loading} size="large">
        <div className={styles.equipment}>
          <TreeSearch className={styles.equipment_tree} />
          <ListTableList className={styles.equipment_table} />
        </div>
      </Spin>
    </PageHeaderWrapper>
  )
}
