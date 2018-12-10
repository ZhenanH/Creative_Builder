import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";
//const dateFormat = "MM/DD/YYYY";
const dataSource = [
  {
    key: 0,
    strategy: "AllSiteVisitors_LifeInsurance_GeoTest",
    targeting: ["WHO", "WHAT"],
    time: moment().fromNow()
  },
  {
    key: 1,
    strategy: "AllSiteVisitors_AIGSpecificSegments_AllLocations",
    targeting: ["WHO", "WHAT", "WHERE"],
    time: moment()
      .startOf("day")
      .fromNow()
  },
  {
    key: 2,
    strategy: "AllSiteVisitors_LifeInsurance_AllGeos",
    targeting: ["WHO", "WHERE"],
    time: "12/11/2018 3:17pm"
  }
];

const columns = [
  {
    title: "Strategy",
    dataIndex: "strategy",
    key: "strategy"
  },
  {
    title: "Targeting",
    dataIndex: "targeting",
    key: "targeting",
    render: tags => (
      <span>
        {tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </span>
    )
  },
  {
    title: "Last Updated",
    dataIndex: "time",
    key: "time"
  }
];

export class StrategyList extends React.Component {
  state = {
    selectedRowKeys: this.props.selectedStrategy
      ? [this.props.selectedStrategy.key]
      : []
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
    this.props.onUpdateStrategy(dataSource[selectedRowKeys[0]]);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div>
        <Table
          size="small"
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}
