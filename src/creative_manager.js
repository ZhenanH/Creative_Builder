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
  Switch,
  Spin
} from "antd";
import { CreativeTray } from "./creative_tray";
import { CreativeGrid } from "./creative_grid";
import { CreativeBuilder } from "./creative_builder.js";
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

export class CreativeManager extends React.Component {
  state = {
    pageSize: 30,
    selectedItems: this.props.selectedItems || [],
    distribution: 1,
    imgs: [],
    value: true,
    productType: 2
  };

  componentDidMount() {
    this.updateFetch(this.state.pageSize);
  }

  updateFetch = pageSize => {
    fetch(
      "https://api.unsplash.com/search/photos/?page=1&per_page=" +
        pageSize +
        "&query=christmas&client_id=" +
        "b999119b619805e445c4bddf0d3d8cbf8f1c922a579afbef57a285cbd4113038"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          imgs: data.results.map(item => {
            item.panels = item.likes % 2 === 0 ? 2 : 4;
            item.creativeName =
              "2018-4_PC_WPR_Adult_Targeting-creative_#" +
              Math.round(Math.random() * 1000);
            return item;
          }),
          loading: false
        });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  };

  // onPageSizeChange = (currnt, pageSize) => {
  //   this.setState({ pageSize: pageSize, loading: true });
  //   this.updateFetch(pageSize);
  // };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedItems !== this.state.selectedItems) {
      this.props.onUpdateSelectedCreative(nextState.selectedItems);
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
    //console.log(item, selected);
    if (selected) {
      this.setState({ selectedItems: this.state.selectedItems.concat([item]) });
    } else if (item) {
      this.setState({
        selectedItems: this.state.selectedItems.filter(i => i.id !== item.id)
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

  handleProductChange = productType => {
    this.setState({ productType });
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
                value={this.state.productType}
                style={{ width: "100%" }}
                onChange={this.handleProductChange}
              >
                <Option value={2}>Postcard</Option>
                <Option value={4}>4 panel catalog</Option>
                <Option value={8}>8 panel catalog</Option>
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
              <Spin
                spinning={this.state.loading}
                wrapperClassName="spin-container"
              >
                <CreativeGrid
                  selectedItems={this.state.selectedItems}
                  onSelectCreative={this.onSelectCreative}
                  distribution={this.state.distribution}
                  items={this.state.imgs.filter(
                    item => item.panels === this.state.productType
                  )}
                  total={this.state.pageSize}
                  pageSize={this.state.pageSize}
                />
              </Spin>
            </div>
          </TabPane>
          <TabPane tab="Create New Creative" key="2">
            <CreativeBuilder />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
