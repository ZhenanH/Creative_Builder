import React from "react";
import { Card, Icon, Popover, Menu, Tag } from "antd";
import Ellipsis from "ant-design-pro/lib/Ellipsis";
const SubMenu = Menu.SubMenu;
const { Meta } = Card;

export class CreativeCard extends React.Component {
  state = {
    isSelected: this.props.selectedItems
      ? this.props.selectedItems.find(
          item => item.id === this.props.item.id
        ) !== undefined
      : false
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.selectedItems !== this.props.selectedItems) {
      this.setState({
        isSelected:
          nextProps.selectedItems.find(
            item => item.id === this.props.item.id
          ) !== undefined
      });
    }
  }
  render() {
    let bgColor = "rgba(0,0,0,0)";
    const reachMax =
      this.props.reachMax ||
      (this.props.selectedItems &&
        this.props.selectedItems.length >= this.props.maxSelection);

    const onSelect = () => {
      if (reachMax && !this.state.isSelected) {
        return;
      }
      this.setState({ isSelected: !this.state.isSelected });
      if (this.props.onSelectCreative) {
        //console.log(reachMax, this.state.isSelected, this.props.onSelectCreative)
        this.props.onSelectCreative(this.props.item, !this.state.isSelected);
      }
    };

    if (reachMax) {
      bgColor = "rgba(200,200,200,0.78)";
    }

    if (this.state.isSelected && !this.props.isInTray) {
      bgColor = "rgba(66, 134, 244,0.7)";
    }

    // if (!this.props.isActive) {
    //   bgColor = "rgba(255, 255, 255, 0.8)";
    // }

    let actions;
    actions = [
      <Icon
        type="eye"
        onClick={e => {
          e.stopPropagation();
          console.log("eye");
        }}
      />,

      <span
        onClick={e => e.stopPropagation()}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Icon type="barcode" style={{ marginRight: 4 }} />
        <span style={{ fontSize: 10 }}>{this.props.item.offerCodeType}</span>
      </span>,
      <Popover
        onClick={e => e.stopPropagation()}
        overlayClassName="creativeExtra popconfirm-container"
        placement="top"
        style={{ background: "white" }}
        content={
          <Menu
            onClick={e => e.domEvent.stopPropagation()}
            style={{ background: "white" }}
          >
            <Menu.Item>
              <Icon type="edit" />
              Edit
            </Menu.Item>
            <Menu.Item>
              <Icon type="delete" />
              Delete
            </Menu.Item>
            <Menu.Item>
              <Icon type="book" />
              Archive
            </Menu.Item>
            <SubMenu
              title="Logs"
              onTitleClick={e => e.domEvent.stopPropagation()}
            >
              <Menu.Item>Recent log 1</Menu.Item>
              <Menu.Item>Recent log 2</Menu.Item>
              <Menu.Item>Recent log 3</Menu.Item>
              <Menu.Item>More</Menu.Item>
            </SubMenu>
          </Menu>
        }
        trigger="click"
      >
        <Icon type="ellipsis" className="card-action" />
      </Popover>
    ];

    if (this.props.isInTray) {
      actions = [
        <Icon
          type="eye"
          onClick={e => {
            e.stopPropagation();
            console.log("eye");
          }}
        />,
        <span
          className={this.props.item.offer ? "attachedOffer" : ""}
          style={{ display: "flex", alignItems: "center" }}
          onClick={
            false
              ? e => {
                  e.stopPropagation();
                  this.props.onEnterCodeDesign(this.props.item, "2");
                }
              : null
          }
        >
          <Icon type="barcode" style={{ marginRight: 4 }} />{" "}
          <span style={{ fontSize: 10 }}>{this.props.item.offerCodeType}</span>
        </span>
      ];
    }

    return (
      <div style={{ position: "relative" }}>
        <style>
          {`
        .ant-popover-inner-content {
          padding:0
          }
          .blinking{

          animation:blinkingText 1.6s infinite;
        }
        @keyframes blinkingText{
          0%{		color: rgba(0,0,0,1);	}
          33%{	color: rgba(0,0,0,0.5);	}
          50%{	color: rgba(0,0,0,0);	}
          67%{	color:rgba(0,0,0,0.5);	}
          100%{	color: rgba(0,0,0,1);	}
        }

        
         
         .disabledLink:hover {
           color: rgba(0,0,0,0.45) !important;
           cursor:not-allowed;
         }

        .attachedOffer {
          color:rgb(82, 196, 26)
        }
        
          `}
        </style>
        <Card
          onClick={this.props.selectable ? onSelect : null}
          hoverable
          style={{ width: "100%", height: "100%" }}
          cover={
            <div
              style={{
                position: "relative",
                top: -0.5,
                height: 130,
                backgroundImage:
                  "url(" +
                  ((this.props.item && this.props.item.urls.small) ||
                    "https://cdn.filestackcontent.com/pCwvyp6qSm3jSOmEBSQV") +
                  ")",
                backgroundSize: "cover"
              }}
            />
          }
          actions={actions}
          bodyStyle={{ padding: 15 }}
        >
          <Meta
            title={
              <div style={{ fontSize: 14 }}>
                <Ellipsis tooltip length={18}>
                  2018-4_PC_WPR_Adult_Targeting-creative
                </Ellipsis>
                <span style={{ fontSize: 11, marginLeft: 8, color: "gray" }}>
                  #2454
                </span>
              </div>
            }
            description={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 400
                }}
              >
                <div style={{ flex: 1 }}>{this.props.item.panels} Panels</div>
                <Icon
                  style={{ flex: 1, color: "#52c41a" }}
                  type="clock-circle"
                />
                <div style={{ flex: 1 }}>
                  Status:{" "}
                  <Icon type="check-circle" style={{ color: "#52c41a" }} />
                </div>
              </div>
            }
          />
        </Card>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: bgColor,
            position: "absolute",
            top: 0,
            pointerEvents: "none"
          }}
        >
          <Icon
            type="check"
            style={{
              color:
                "rgba(255,255,255," +
                (this.state.isSelected && !this.props.isInTray ? "1" : "0") +
                ")",
              left: "47%",
              top: "50%",
              position: "relative",
              fontSize: 30,
              fontWeight: "bolder"
            }}
          />
        </div>
      </div>
    );
  }
}
