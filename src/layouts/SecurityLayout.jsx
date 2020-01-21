/*
 * @Description: desc
 * @Author: zhanghaoyu004
 * @Date: 2020-01-06 23:32:22
 * @LastEditTime : 2020-01-21 13:18:13
 * @LastEditors  : zhanghaoyu004
 */
import React from "react"
import { connect } from "dva"
import { PageLoading } from "@ant-design/pro-layout"
import { Redirect } from "umi"
import { stringify } from "querystring"

class SecurityLayout extends React.Component {
  state = {
    isReady: false
  }

  componentDidMount() {
    this.setState({
      isReady: true
    })
    const { dispatch } = this.props

    // if (dispatch) {
    //   dispatch({
    //     type: "user/fetchCurrent"
    //   })
    // }
  }

  render() {
    const { isReady } = this.state
    const { children, loading, currentUser } = this.props // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLogin = currentUser && currentUser.userid
    const queryString = stringify({
      redirect: window.location.href
    })

    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading />;
    // }

    // if (!isLogin) {
    //   return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    // }

    return children
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user
}))(SecurityLayout)
