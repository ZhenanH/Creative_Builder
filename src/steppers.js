import React from "react";
import { Steps, Button, message, Icon } from "antd";
import { CreativeManager } from "./creative_manager";
import { StrategyManager } from "./strategy_manager";
const Step = Steps.Step;

export class Steppers extends React.Component {
  state = {
    current: 1,
    hasDynamicOffer: true
  };

  onOfferTypeSelect = value => {
    console.log(value);
    this.setState({ hasDynamicOffer: value });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({
      current:
        !this.state.hasDynamicOffer && this.state.current === 1
          ? current + 1
          : current
    });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({
      current:
        !this.state.hasDynamicOffer && this.state.current === 3
          ? current - 1
          : current
    });
  }

  render() {
    const { current } = this.state;
    const steps = [
      {
        title: (
          <span onClick={() => this.setState({ current: 0 })}>Strategy</span>
        ),
        content: <StrategyManager />,
        status: "wait"
      },
      {
        title: (
          <span onClick={() => this.setState({ current: 1 })}>Creative</span>
        ),
        content: (
          <div>
            <CreativeManager onOfferTypeSelect={this.onOfferTypeSelect} />
          </div>
        ),
        status: "wait"
      },
      {
        title: (
          <span
            onClick={
              this.state.hasDynamicOffer
                ? () => this.setState({ current: 2 })
                : null
            }
          >
            {this.state.hasDynamicOffer ? "Dynamic offer" : "Static offer"}
          </span>
        ),
        content: <div />,
        status: this.state.hasDynamicOffer ? "wait" : "finish"
      },
      {
        title: (
          <span onClick={() => this.setState({ current: 3 })}>Summary</span>
        ),
        content: <div />,
        status: "wait"
      }
    ];
    return (
      <div>
        <Steps
          current={current}
          style={{
            backgroundColor: "#fafafa",
            padding: "16px 48px 16px 48px",
            borderBottom: "1px solid #e8e8e8"
          }}
        >
          {steps.map((item, index) => (
            <Step
              key={item.title + index}
              title={item.title}
              status={index === this.state.current ? "process" : item.status}
              icon={
                item.status === "finish" ? (
                  <div
                    className={
                      index === this.state.current ? "active-step" : ""
                    }
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "1px solid #1890ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon type="check" style={{ fontSize: 16 }} />
                  </div>
                ) : index === 3 ? (
                  <div
                    className={
                      index === this.state.current ? "active-step" : ""
                    }
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "1px solid #e8e8e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon type="flag" style={{ fontSize: 16 }} />
                  </div>
                ) : null
              }
            />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && (
            <Button style={{ margin: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              style={{ margin: 8 }}
              type="primary"
              onClick={() => this.next()}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              style={{ margin: 8 }}
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Attach Strategy Set
            </Button>
          )}
        </div>
      </div>
    );
  }
}
