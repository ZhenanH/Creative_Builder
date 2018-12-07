import React from "react";
import { Card, Icon } from "antd";
import Ellipsis from "ant-design-pro/lib/Ellipsis";

const { Meta } = Card;

export class CreativeCard extends React.Component {
  state = {
    isSelected: this.props.selectedItems
      ? this.props.selectedItems.indexOf(this.props.item) >= 0
      : false
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.selectedItems !== this.props.selectedItems) {
      this.setState({
        isSelected: nextProps.selectedItems.indexOf(this.props.item) >= 0
      });
    }
  }
  render() {
    let bgColor = "rgba(0,0,0,0)";
    const reachMax =
      this.props.selectedItems &&
      this.props.selectedItems.length >= this.props.maxSelection;

    const onSelect = () => {
      if (reachMax && !this.state.isSelected) {
        return;
      }
      this.setState({ isSelected: !this.state.isSelected });
      if (this.props.onSelectCreative) {
        this.props.onSelectCreative(this.props.item, !this.state.isSelected);
      }
    };

    if (reachMax) {
      bgColor = "rgba(200,200,200,0.78";
    }

    if (this.state.isSelected) {
      bgColor = "rgba(66, 134, 244,0.7";
    }

    return (
      <div style={{ position: "relative" }}>
        <Card
          onClick={this.props.selectable ? onSelect : null}
          hoverable
          style={{ width: "100%", height: "100%" }}
          cover={
            <div
              style={{
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
          actions={[
            <Icon
              type="eye"
              onClick={e => {
                e.stopPropagation();
                console.log("eye");
              }}
            />,
            <Icon type="edit" />,
            <Icon type="ellipsis" />
          ]}
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}>2 Panels</div>
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
                "rgba(255,255,255," + (this.state.isSelected ? "1" : "0") + ")",
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
