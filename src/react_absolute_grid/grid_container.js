"use strict";

import React from "react";

export default class SampleDisplay extends React.Component {
  getName = (sort, panels) => {
    var panels = panels || 2;
    switch (sort) {
      case 1:
        return "Front Cover";
      case 2:
        return panels === 2
          ? "Mailing back"
          : panels === 4
            ? "Inside 1"
            : "Inside Cover";
      case 3:
        return panels === 4 ? "Inside 2" : "Page 3";
      case 4:
        return panels === 4 ? "Mailing back" : "Left centerfold";
      case 5:
        return "Right centerfold";
      case 6:
        return "Page 6";
      case 7:
        return "Inside Back Cover";
      case 8:
        return "Mailing back";
    }
  };
  render() {
    const itemStyle = {
      display: "block",
      width: "100%",
      height: "100%",
      textAlign: "center",
      background: "#f7f7f7",
      boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      border: "dashed 2px #e8e8e8"
    };

    if (this.props.item.key === this.props.panels) {
      if (this.props.orientation === "Protrait") {
        itemStyle.height = Math.round((100 * 1120) / 1875) + "%";
        itemStyle.width = Math.round((100 * 970) / 1350) + "%";
      } else {
        itemStyle.height = Math.round((100 * 1120) / 1350) + "%";
        itemStyle.width = Math.round((100 * 970) / 1875) + "%";
      }
    }

    return (
      <div style={itemStyle} className="gridItem">
        <span
          className="name"
          style={{ position: "absolute", top: -24, width: itemStyle.width }}
        >
          {this.getName(this.props.item.sort, this.props.panels)}
        </span>
      </div>
    );
  }
}
