import React from 'react';
import { Tag } from 'antd';
import styles from './index.less';

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = {
    checked: false,
  };

  handleChange = (code,checked) => {
    this.setState({
      checked,
    });
    this.props.onSelect(code,checked)
  };

  render() {
    let {code} = this.props
    return (
      <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange.bind(this,code)} />
    );
  }
}

export default (props) => (
  <div className={styles.container}>
    <div id="components-tag-demo-checkable">
      <div>
       {props.tags.map(tag=>{
        return  <MyTag code ={tag.code} onSelect={props.onSelect}>{tag.name}</MyTag>
                })
      } 
      </div>
    </div>
  </div>
);
