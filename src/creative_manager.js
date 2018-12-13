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
  Spin,
  Button
} from "antd";
import { CreativeTray } from "./creative_tray";
import { CreativeGrid } from "./creative_grid";
import { CreativeBuilder } from "./creative_builder.js";
import { OfferList } from "./offer_list";

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

export class CreativeManager extends React.Component {
  state = {
    pageSize: 30,
    selectedItems: this.props.selectedItems || [],
    distribution: this.props.distribution || 1,
    imgs: [],
    value: true,
    productType: 2,
    isDesignCode: "1",
    activeCreative: null,
    editingCreative: null,
    creativeTab: "1"
  };

  componentDidMount() {
    this.updateFetch(this.state.pageSize);
  }

  onEnterCodeDesign = (creative, isDesignCode) => {
    this.setState({ isDesignCode: isDesignCode, activeCreative: creative });
  };
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
            item.offerCodeType =
              item.likes % 3 === 0
                ? "NONE"
                : Math.random() < 0.5
                ? "DYNAMIC"
                : "STATIC";
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
        this.props.onUpldateDistribution(1);
      }
      if (nextState.selectedItems.length > 1) {
        if (this.state.selectedItems.length === 1) {
          this.setState({ distribution: 3 });
          this.props.onUpldateDistribution(3);
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

  onEnterEditCreative = creative => {
    console.log(creative);
    this.setState({
      editingCreative: creative,
      creativeTab: creative ? "3" : "1"
    });
  };
  onAddreseeChange = e => {
    this.setState({ customeAddressee: e });
  };

  handleProductChange = productType => {
    this.setState({ productType });
  };

  handleSizeChange = size => {
    this.props.updateSize(size);
  };

  handleFinishChange = finish => {
    this.props.updateFinish(finish);
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
                defaultValue="Landscape"
                style={{ width: "100%" }}
                onChange={this.handleChange}
              >
                <Option value="Protrait">Protrait</Option>
                <Option value="Landscape">Landscape</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Size">
              <Select
                value={this.props.size}
                placeholder="please select"
                style={{ width: "100%" }}
                onChange={this.handleSizeChange}
              >
                <Option value="jack">4 x 6</Option>
                <Option value="lucy">5 x 7</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Finish Type">
              <Select
                value={this.props.finish}
                placeholder="please select"
                style={{ width: "100%" }}
                onChange={this.handleFinishChange}
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
          <Col span={6} style={{ padding: 0 }}>
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
            <div style={{ marginTop: 12, marginBottom: 24 }}>
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
        <Tabs
          activeKey={this.state.creativeTab}
          onChange={creativeTab => this.setState({ creativeTab })}
        >
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
                        this.props.onUpldateDistribution(e.target.value);
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
                  onEnterCodeDesign={this.onEnterCodeDesign}
                />
              </div>
              <div>
                <style>
                  {`
                  .creativeTab .ant-tabs-top-bar {
                    display:none;
                  }
                `}
                </style>
                <Tabs
                  className="creativeTab"
                  activeKey={this.state.isDesignCode}
                >
                  <TabPane tab="Tab1" key="1">
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
                        onEnterEditCreative={this.onEnterEditCreative}
                      />
                    </Spin>
                  </TabPane>
                  <TabPane tab="Tab2" key="2">
                    <div style={{ padding: "0px 12px 12px 12px" }}>
                      <Button
                        icon="left"
                        style={{ marginBottom: 12 }}
                        onClick={() => this.setState({ isDesignCode: "1" })}
                      >
                        Back
                      </Button>

                      <div style={{ fontWeight: "bold", marginBottom: 12 }}>
                        Attach Offer Code Bank
                      </div>
                      <OfferList
                        onUpdateOffer={this.props.onUpdateOffer}
                        activeCreative={this.state.activeCreative}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Create New Creative" key="2">
            <CreativeBuilder />
          </TabPane>
          <TabPane
            tab={this.state.editingCreative ? "Edit Creative" : ""}
            key="3"
          >
            <CreativeBuilder
              creative={this.state.editingCreative}
              isEditing
              onEnterEditCreative={this.onEnterEditCreative}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
