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

export class CreativeManager extends React.Component {
  state = {
    selectedItems: [],
    distribution: 1,
    imgs: [],
    value: true
  };

  componentDidMount() {
    fetch(
      "https://api.unsplash.com/search/photos/?page=1&per_page=12&query=christmas&client_id=" +
        "b999119b619805e445c4bddf0d3d8cbf8f1c922a579afbef57a285cbd4113038"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ imgs: data.results });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedItems !== this.state.selectedItems) {
      if (
        nextState.selectedItems.length === 0 ||
        nextState.selectedItems.length === 1
      ) {
        this.setState({ distribution: 1 });
      }
      if (nextState.selectedItems.length > 1) {
        if (this.state.selectedItems.length === 1) {
          this.setState({ distribution: 3 });
        }
      }
    }
  }
  onSelectCreative = (item, selected) => {
    if (selected) {
      this.setState({ selectedItems: this.state.selectedItems.concat([item]) });
    } else {
      this.setState({
        selectedItems: this.state.selectedItems.filter(i => i !== item)
      });
    }
  };

  onOfferTypeChang = e => {
    this.props.onOfferTypeSelect(e.target.value);
    this.setState({ value: e.target.value });
  };

  onRemoveSelectedItem = item => {
    this.setState({
      selectedItems: this.state.selectedItems.filter(e => e !== item)
    });
  };

  onUpateSelectedNum = items => {
    this.setState({
      selectedItems: items
    });
  };
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  onAddreseeChange = e => {
    this.setState({ customeAddressee: e });
  };

  render() {
    const radioStyle = {
      //display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    return (
      <div style={{ padding: 24 }}>
        <div className="section-title">Select Product</div>
        <Row
          gutter={16}
          style={{
            margin: "12px 0 24px 0px",
            borderBottom: "1px solid #e8e8e8"
          }}
        >
          <Col span={6}>
            <FormItem label="Product Type">
              <Select
                defaultValue="jack"
                style={{ width: "100%" }}
                onChange={this.handleChange}
              >
                <Option value="jack">Postcard</Option>
                <Option value="lucy">4 panel catalog</Option>
                <Option value="Yiminghe">8 panel catalog</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Orientation">
              <Select
                defaultValue="lucy"
                style={{ width: "100%" }}
                onChange={this.handleChange}
              >
                <Option value="jack">Protrait</Option>
                <Option value="lucy">Landscape</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Size">
              <Select
                placeholder="please select"
                style={{ width: "100%" }}
                onChange={this.handleChange}
              >
                <Option value="jack">4 x 6</Option>
                <Option value="lucy">5 x 7</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Finish Type">
              <Select
                placeholder="please select"
                style={{ width: "100%" }}
                onChange={this.handleChange}
              >
                <Option value="jack">Glossy</Option>
                <Option value="lucy">Mett</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row
          gutter={16}
          style={{
            margin: "12px 0 24px 0px",
            borderBottom: "1px solid #e8e8e8"
          }}
        >
          <Col span={6} style={{ paddingLeft: 0 }}>
            <div className="section-title">Offer Type</div>
            <RadioGroup
              onChange={this.onOfferTypeChang}
              value={this.state.value}
              style={{ marginBottom: 24 }}
            >
              <Radio style={radioStyle} value={true}>
                Dynamic
              </Radio>
              <Radio style={radioStyle} value={false}>
                Static
              </Radio>
            </RadioGroup>
          </Col>

          <Col span={6}>
            <div>
              <span className="section-title">Addressee</span>
              {this.state.customeAddressee ? (
                <Tooltip title="The USPS has strict rules on what can be used as a Custom Addressee. Please ensure you get this approved by Tom Gibbons before proceeding">
                  <Icon
                    type="info-circle"
                    theme="outlined"
                    style={{ color: "orange", marginLeft: 8 }}
                  />
                </Tooltip>
              ) : null}
            </div>
            <div style={{ marginTop: 12 }}>
              <Input
                addonBefore={
                  <Switch
                    onChange={this.onAddreseeChange}
                    checkedChildren="Custom"
                    unCheckedChildren="Default"
                    defaultChecked={false}
                  />
                }
                defaultValue={"Resident"}
                disabled={!this.state.customeAddressee}
                value={
                  !this.state.customeAddressee
                    ? "Resident"
                    : this.state.addresseeInput
                }
                onChange={e =>
                  this.setState({ addresseeInput: e.target.value })
                }
                placeholder="Type in addressee"
              />
            </div>
          </Col>
        </Row>

        <div className="section-title">Add Creative</div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Saved Creative" key="1">
            <div style={{ display: "flex" }}>
              <div
                style={{
                  minWidth: 320,
                  maxWidth: 320,
                  borderRight: "1px solid #E8E8E8",
                  minHeight: 400
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginTop: 12,
                    height: 24
                  }}
                >
                  Distribution
                  <span
                    style={{
                      margin: "12px 0 12px 12px",
                      fontWeight: "normal",
                      display: this.state.distribution === 1 ? "none" : "inline"
                    }}
                  >
                    <RadioGroup
                      size="small"
                      value={this.state.distribution}
                      onChange={e => {
                        if (
                          e.target.value === 1 &&
                          this.state.selectedItems.length > 1
                        ) {
                          return;
                        }
                        this.setState({ distribution: e.target.value });
                      }}
                    >
                      <RadioButton value={3}>A/B Test</RadioButton>
                      <RadioButton value={2}>Scheduling</RadioButton>
                    </RadioGroup>
                  </span>
                </div>

                <CreativeTray
                  items={this.state.selectedItems}
                  distribution={this.state.distribution}
                  onRemoveSelectedItem={this.onRemoveSelectedItem}
                  onUpateSelectedNum={this.onUpateSelectedNum}
                />
              </div>

              <CreativeGrid
                selectedItems={this.state.selectedItems}
                onSelectCreative={this.onSelectCreative}
                distribution={this.state.distribution}
                items={this.state.imgs}
              />
            </div>
          </TabPane>
          <TabPane tab="Create New Creative" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
