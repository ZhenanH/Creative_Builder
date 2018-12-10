"use strict";

import React from "react";

export default class SampleDisplay extends React.Component {
  render() {
    const itemStyle = {
      display: "block",
      width: "100%",
      height: "100%",
      textAlign: "center",
      opacity: this.props.item.url ? 1 : 0,
      backgroundImage: `url('${this.props.item.url}')`
    };

    //const
    if (this.props.item.key === this.props.panels) {
      if (this.props.orientation === "Protrait") {
        itemStyle.height = (100 * 1120) / 1875 + "%";
        itemStyle.width = (100 * 970) / 1350 + "%";
        itemStyle.padding = `${(100 * 85) / 1350}% ${(100 * 25) /
          1350}% ${(100 * 25) / 1350}% ${(100 * 85) / 1350}%`;
      } else {
        itemStyle.height = (100 * 1120) / 1350 + "%";
        itemStyle.width = (100 * 970) / 1875 + "%";
        itemStyle.padding = `${(100 * 85) / 1875}% ${(100 * 25) /
          1875}% ${(100 * 25) / 1875}% ${(100 * 85) / 1875}%`;
      }
    } else {
      if (this.props.orientation === "Protrait") {
        itemStyle.padding = `${(100 * 85) / 1350}%`;
      } else {
        itemStyle.padding = `${(100 * 85) / 1875}%`;
      }
    }

    return (
      <div style={itemStyle} className="gridItem">
        <div
          style={{ width: "100%", height: "100%", border: "solid pink 1px" }}
        />
      </div>
    );
  }
}
