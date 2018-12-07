import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Steppers } from "./steppers";

const StrategySet = (
  <div style={{ border: "1px solid #e8e8e8" }}>
    <div
      style={{
        fontSize: 16,
        borderBottom: "1px solid #e8e8e8",
        padding: 12,
        fontWeight: "bold",
        backgroundColor: "#fafafa"
      }}
    >
      Strategy Set
    </div>
    <Steppers />
  </div>
);
ReactDOM.render(StrategySet, document.getElementById("container"));
