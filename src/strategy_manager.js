import React from "react";
import {
  Tabs,
  Radio,
  Popconfirm,
  Row,
  Col,
  Form,
  Select,
  Tooltip,
  Icon,
  Input,
  Switch
} from "antd";
import { CreativeTray } from "./creative_tray";
import { CreativeGrid } from "./creative_grid";

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

export class StrategyManager extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ padding: 24 }}>
        <div className="section-title">Add Strategy</div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Saved Strategy" key="1" />
          <TabPane tab="Create New Strategy" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
