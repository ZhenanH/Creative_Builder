import React from "react";
import "./index.css";
import "ant-design-pro/dist/ant-design-pro.css";
import ReactFilestack, { client } from "filestack-react";
import { CreativePanels } from "./react_absolute_grid/creative_panels.js";
import { CodeDesigner } from "./CodeDesigner/CodeDesigner";
import CreativeApprovalDropdown from "@bit/zhenanh.pdm.creative-approval-dropdown"
import * as _ from "lodash";
import {
  Alert,
  Icon,
  Button,
  DatePicker,
  Card,
  Form,
  Input,
  Select,
  Row,
  Col,
  Modal,
  Popconfirm,
  Radio,
  Spin,
  Tabs
} from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;

export class CreativeBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef3 = React.createRef();
    //console.log(this.props);
  }

  state = {
    uploadPhotos: this.props.creative
      ? this.props.creative.panels === 2
        ? [
            { url: this.props.creative.urls.regular },
            { url: this.props.creative.urls.regular }
          ]
        : [
            { url: this.props.creative.urls.regular },
            { url: this.props.creative.urls.regular },
            { url: this.props.creative.urls.regular },
            { url: this.props.creative.urls.regular }
          ]
      : [],
    panels: 2,
    orientation: this.props.creative
      ? this.props.creative.orientation
      : "Protrait",
    size: "4x6",
    type: "none"
  };

  componentWillUpdate(nextProps, nextState) {
    //console.log("nextState", nextState);

    if (this.props.creative !== nextProps.creative) {
      this.setState({
        uploadPhotos: nextProps.creative
          ? nextProps.creative.panels === 2
            ? [
                { url: nextProps.creative.urls.regular },
                { url: nextProps.creative.urls.regular }
              ]
            : [
                { url: nextProps.creative.urls.regular },
                { url: nextProps.creative.urls.regular },
                { url: nextProps.creative.urls.regular },
                { url: nextProps.creative.urls.regular }
              ]
          : []
      });
    }
  }

  componentDidMount() {
    //console.log("did mount", this);
    this.setState({
      panelHost: this.myRef.current,
      panelHost_back: this.myRef2.current,
      zoom: this.myRef3.current
    });
  }

  handleTypeChange = value => {
    this.setState({ type: value });
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };
  uploadLimit = type => {
    if (type === "CARD") {
      return 2;
    } else if (type === "Catelog(4 panels)") {
      return 4;
    } else if (type === "Catelog(8 panels)") {
      return 8;
    } else return 2;
  };

  onChange = e => {
    console.log(`radio checked:${e.target.value}`);
  };

  onConfirm = e => {
    this.setState({
      panels: this._panels,
      orientation: this._orientation,
      size: this._size,
      uploadPhotos: []
    });
  };

  onPanelChange = e => {
    if (this.state.uploadPhotos.length > 0) {
      (this._panels = e.target.value),
        (this._orientation = "Protrait"),
        (this._size = "4x6");
    } else {
      if (e.target.value > 2) {
        this.setState({
          panels: e.target.value,
          orientation: "Protrait",
          size: "4x6"
        });
      } else {
        this.setState({ panels: e.target.value });
      }
    }
  };

  onOrientationChange = e => {
    this.setState({ orientation: e.target.value, uploadPhotos: [] });
  };

  onSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  onTypeChange = e => {
    this.setState({ type: e.target.value });
  };

  render() {
    var layout1 = [
      { i: "a", x: 0, y: 0, w: 2, h: 2 },
      { i: "b", x: 2, y: 0, w: 2, h: 2 },
      { i: "c", x: 4, y: 0, w: 2, h: 2 }
    ];
    var layouts = {
      lg: layout1,
      mg: layout1,
      sm: layout1,
      xs: layout1,
      xss: layout1
    };

    return (
      <Row gutter={24}>
        <style>
          {`
          .gridItem {
            background-size: 100%;
          box-shadow: 0 0 1.25em 0 rgba(0, 0, 0, 0.2);
          background-color: #fff;
          cursor: move;
        }
        
      .gridItem .name {
          display: block;
          bottom: -22px;
          width: 100%;
          font-size: 12px;
          position: absolute;
          color: #555;
          text-transform: capitalize;
        }
        `}
        </style>
        <Col
          span={6}
          style={{ borderRight: "1px solid #e8e8e8", paddingRight: 24 }}
        >
         <CreativeApprovalDropdown/>
          <Form>
            <FormItem label="Creative Name">
              <Input
                placeholder="Enter creative name"
                defaultValue={
                  this.props.creative ? this.props.creative.name : null
                }
              />
            </FormItem>
            <FormItem label="Expiration date">
              <DatePicker style={{ width: "100%" }} />
            </FormItem>
          </Form>
          <FormItem label="Number of Panels">
            <RadioGroup
              size="small"
              onChange={this.onPanelChange}
              value={this.state.panels}
            >
              {this.state.uploadPhotos.length > 0
                ? [
                    <Popconfirm
                      title="Changing this setting will remove uploaded panels"
                      okText="Yes"
                      onConfirm={this.onConfirm}
                    >
                      <RadioButton value={2} key={1}>
                        2 panels
                      </RadioButton>
                    </Popconfirm>,
                    <Popconfirm
                      title="Changing this setting will remove uploaded panels"
                      okText="Yes"
                      onConfirm={this.onConfirm}
                    >
                      <RadioButton value={4} key={2}>
                        4 panels
                      </RadioButton>
                    </Popconfirm>,
                    <Popconfirm
                      title="Changing this setting will remove uploaded panels"
                      okText="Yes"
                      onConfirm={this.onConfirm}
                    >
                      <RadioButton value={8} key={3}>
                        8 panels
                      </RadioButton>
                    </Popconfirm>
                  ]
                : [
                    <RadioButton value={2} key={11}>
                      2 panels
                    </RadioButton>,
                    <RadioButton value={4} key={12}>
                      4 panels
                    </RadioButton>,
                    <RadioButton value={8} key={13}>
                      {" "}
                      8 panels
                    </RadioButton>
                  ]}
            </RadioGroup>
          </FormItem>
          <FormItem label="Orientation">
            <RadioGroup
              size="small"
              onChange={this.onOrientationChange}
              value={this.state.orientation}
            >
              <RadioButton value="Protrait">Protrait</RadioButton>
              <RadioButton value="Landscape" disabled={this.state.panels > 2}>
                Landscape
              </RadioButton>
            </RadioGroup>
          </FormItem>
          <FormItem label="Offer Type">
            <RadioGroup
              size="small"
              onChange={this.onTypeChange}
              value={this.state.type}
            >
              <RadioButton value="none">none</RadioButton>
              <RadioButton value="static">static</RadioButton>
              <RadioButton value="dynamic">dynamic</RadioButton>
            </RadioGroup>
          </FormItem>
          <div style={{ display: "flex" }}>
            {this.props.isEditing ? (
              [
                <Button
                  onClick={() => this.props.onEnterEditCreative(null)}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>,
                <Button type="primary" style={{ marginRight: 8 }}>
                  Save Creative
                </Button>
              ]
            ) : (
              <Button type="primary" style={{ marginRight: 8 }}>
                Save Creative
              </Button>
            )}
          </div>
          {false && (
            <FormItem label="Size">
              <RadioGroup
                size="small"
                onChange={this.onSizeChange}
                value={this.state.size}
              >
                <RadioButton value="4x6">4 x 6 "</RadioButton>
                <RadioButton value="5x7" disabled={this.state.panels > 2}>
                  5 x 7 "
                </RadioButton>
              </RadioGroup>
            </FormItem>
          )}
        </Col>

        <Col span={18} style={{ position: "relative" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Panels" key="1" style={{ padding: 12 }}>
              <div
                style={{
                  display: "flex",
                  margin: "8px 8px 12px 8px",
                  alignItems: "center",
                  // borderBottom: "1px solid #e8e8e8",
                  paddingBottom: 8
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <ReactFilestack
                    apikey="AJNb8qteNQg2Yy1mXNBwQz"
                    render={({ onPick }) => (
                      <div>
                        {this.state.uploadPhotos.length > 0 ? (
                          <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                              this.setState({ uploadPhotos: [] });
                            }}
                          >
                            <Icon type="delete" /> Remove all images
                          </Button>
                        ) : (
                          <Button size="small" type="primary" onClick={onPick}>
                            <Icon type="upload" /> Upload Images (
                            {this.props.creative &&
                            this.props.creative.creatives
                              ? this.props.creative.creatives.length
                              : this.state.uploadPhotos.length}
                            /{this.state.panels})
                          </Button>
                        )}
                      </div>
                    )}
                    options={{
                      fromSources: ["local_file_system"],
                      disableTransformer: true,
                      maxFiles:
                        this.state.panels > this.state.uploadPhotos.length
                          ? this.state.panels - this.state.uploadPhotos.length
                          : this.state.panels,
                      accept: "image/*",
                      storeTo: {
                        location: "s3"
                      },
                      onFileSelected: file => {
                        //console.log("ha?", file);
                        if (file.size > 4000 * 1000) {
                          console.log(file);
                          throw new Error(
                            "File too big, select something smaller than 1MB"
                          );
                        }
                      }
                    }}
                    onSuccess={res => {
                      console.log("success ", res);
                      this.setState({
                        uploadPhotos: this.state.uploadPhotos.concat(
                          res.filesUploaded
                        )
                      });
                    }}
                  />
                  <div ref={this.myRef3} style={{ marginLeft: 12 }} />
                </div>
              </div>
              {this.state.uploadPhotos.length > 0 && (
                <Alert
                  //message="Save Area"
                  description="Tom will provide a long text here to stress the importantce of save area ..."
                  type="info"
                />
              )}
              <div
                style={{
                  position: "relative",
                  marginTop: 40,
                  marginBottom: 24
                }}
              >
                <div
                  ref={this.myRef2}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%"
                  }}
                />
                <div ref={this.myRef} />

                {this.state.panelHost ? (
                  <CreativePanels
                    host={this.state.panelHost}
                    host_back={this.state.panelHost_back}
                    zoom={this.state.zoom}
                    items={this.state.uploadPhotos}
                    panels={this.state.panels || 2}
                    orientation={this.state.orientation}
                  />
                ) : (
                  <Spin size="large" />
                )}
              </div>
            </TabPane>
            <TabPane
              tab="Customize Offer"
              disabled={this.state.type !== "dynamic"}
              key="2"
            >
              <CodeDesigner
                image={
                  this.state.uploadPhotos.length > 0
                    ? this.state.uploadPhotos.slice(-1)[0].url
                    : null
                }
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}
