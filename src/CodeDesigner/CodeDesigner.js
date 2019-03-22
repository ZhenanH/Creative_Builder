import React from "react";
import ReactDOM from "react-dom";
import { Input, Icon, InputNumber } from "antd";
import Draggable from "react-draggable";
import { SketchPicker } from "react-color";
import { StyledCodeDesigner } from "./StyledCodeDesigner";

export class CodeDesigner extends React.Component {
  state = {
    displayColorPicker: false,
    color: "#00BCF2",
    fontSize: 20,
    initalClass: "initial"
  };

  onFontSizeChange = value => {
    this.setState({ fontSize: value });
  };
  handleClick = () => {
    console.log(this.state.displayColorPicker);
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.hex });
  };

  render() {
    // setTimeout(() => {
    //   this.setState({ isInitial: false });
    // }, 2);

    const popover = {
      position: "absolute",
      zIndex: "2",
      left: 300,
      top: 0
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };

    return (
      <StyledCodeDesigner>
        <div
          className="container"
          style={{
            backgroundImage: this.props.image
              ? "url('" + this.props.image + "')"
              : "url('https://via.placeholder.com/970x1120?text=Postcard+back')",
            backgroundSize: "contain"
          }}
        >
          {this.state.displayColorPicker && (
            <div className="cover" style={cover} onClick={this.handleClose} />
          )}
          <Draggable
            handle=".handle"
            bounds="parent"
            position={null}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
          >
            <div
              onMouseOver={() =>
                this.setState({ isHover: true, initalClass: "" })
              }
              onMouseOut={() => this.setState({ isHover: false })}
              className={
                this.state.isHover || this.state.displayColorPicker
                  ? "hover code-container " + this.state.initalClass
                  : "code-container " + this.state.initalClass
              }
              style={{
                width: 300,
                position: "relative",
                left: "calc(50% - 150px)",
                top: "58%"
              }}
            >
              <div id="handle" className={"handle " + this.state.initalClass}>
                <Icon
                  type="drag"
                  className="drag"
                  style={{ margin: "0 12px 0 8px" }}
                />
                <InputNumber
                  size="small"
                  value={this.state.fontSize}
                  style={{ width: 68, margin: "0 8px 0 8px" }}
                  formatter={value => `${value}px`}
                  parser={value => value.replace("px", "")}
                  onChange={this.onFontSizeChange}
                />
                <div
                  style={{
                    backgroundColor: this.state.color,
                    width: 20,
                    height: 20,
                    border: "2px solid white",
                    display: "inline-block"
                  }}
                  onClick={this.handleClick}
                />
                {this.state.displayColorPicker ? (
                  <div style={popover}>
                    <SketchPicker
                      color={this.state.color}
                      onChange={this.handleChange}
                    />
                  </div>
                ) : null}
              </div>
              <Input
                defaultValue="RUN2019HOHOHO"
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  border: "0",
                  fontSize: this.state.fontSize,
                  color: this.state.color,
                  textAlign: "center"
                }}
              />
            </div>
          </Draggable>
        </div>
      </StyledCodeDesigner>
    );
  }
}
