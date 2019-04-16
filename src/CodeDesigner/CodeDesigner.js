import React from "react";
import ReactDOM from "react-dom";
import { Input, Icon, Popover, Slider } from "antd";
import Draggable from "react-draggable";
import { GithubPicker } from "react-color";
import { StyledCodeDesigner } from "./StyledCodeDesigner";

export class CodeDesigner extends React.Component {
  state = {
    displayColorPicker: false,
    color: "white",
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
      left: 160,
      //top: -30
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
                <Popover content={ <div style={{width:100,height:40,paddingTop:5}}><Slider tooltipVisible={false} value={this.state.fontSize} onChange={this.onFontSizeChange} max={30} min={10} /></div> }>
                  <Icon type="font-size" trigger="click" style={{margin: "0 12px 0 8px"}}  />
                </Popover>
                
                <div
                  style={{
                    backgroundColor: this.state.color,
                    width: 20,
                    height: 20,
                    border: "2px solid lightgray",
                    display: "inline-block"
                  }}
                  onClick={this.handleClick}
                />
                {this.state.displayColorPicker ? (
                  <div style={popover}>
                    <GithubPicker
                      width="65px"
                      color={this.state.color}
                      onChange={this.handleChange}
                      colors={["black","white"]}
                      triangle = "hide"
                      style={{backgroundColor:"lightgray"}}
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
