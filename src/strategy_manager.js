import React from "react";
import { Tabs } from "antd";
import { StrategyList } from "./strategy_list";

const TabPane = Tabs.TabPane;

export class StrategyManager extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ padding: 24 }}>
        <div className="section-title">Add Strategy</div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Saved Strategy" key="1">
            <StrategyList
              onUpdateStrategy={this.props.onUpdateStrategy}
              selectedStrategy={this.props.selectedStrategy}
            />
          </TabPane>
          <TabPane tab="Create New Strategy" key="2">
            Strategy builder
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
