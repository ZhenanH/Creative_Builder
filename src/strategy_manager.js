import React from "react";
import { Tabs } from "antd";
import { StrategyList } from "./strategy_list";

const TabPane = Tabs.TabPane;

export class StrategyManager extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ padding: 24 }}>
        <div className="section-title">Select Strategy</div>
        
            <StrategyList
              onUpdateStrategy={this.props.onUpdateStrategy}
              selectedStrategy={this.props.selectedStrategy}
            />
        
      </div>
    );
  }
}
