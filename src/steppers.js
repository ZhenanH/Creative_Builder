import React from "react";
import { Steps, Button, message, Icon } from "antd";
import { CreativeManager } from "./creative_manager";
import { StrategyManager } from "./strategy_manager";
import { OfferManager } from "./offer_manager";
import { Summary } from "./set_summary";
const Step = Steps.Step;

export class Steppers extends React.Component {
  state = {
    current: 1,
    hasDynamicOffer: true,
    selectedItems: [],
    selectedStrategy: null,
    distribution: 1
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

  onUpdateStrategy = strategy => {
    this.setState({ selectedStrategy: strategy });
  };
  onUpdateSelectedCreative = items => {
    this.setState({ selectedItems: items });
  };

  onUpdateActiveCreativeKey = key => {
    this.setState({ activeCreativeKey: key });
  };

  onUpldateDistribution = distribution => {
    this.setState({ distribution });
  };

  onUpdateOffer = (creative, offer) => {
    this.setState({
      selectedItems: this.state.selectedItems.map(item => {
        if (item.id === creative.id) {
          item.offer = offer;
        }
        return item;
      })
    });
  };

  updateFinish = finish => {
    this.setState({ finish });
  };

  updateSize = size => {
    this.setState({ size });
  };

  render() {
    const { current } = this.state;
    const steps = [
      {
        title: (
          <span onClick={() => this.setState({ current: 0 })}>Strategy</span>
        ),
        content: (
          <StrategyManager
            onUpdateStrategy={this.onUpdateStrategy}
            selectedStrategy={this.state.selectedStrategy}
          />
        ),
        status: this.state.selectedStrategy ? "finish" : "wait"
      },
      {
        title: (
          <span onClick={() => this.setState({ current: 1 })}>Creative</span>
        ),
        content: (
          <div>
            <CreativeManager
              onOfferTypeSelect={this.onOfferTypeSelect}
              onUpdateSelectedCreative={this.onUpdateSelectedCreative}
              selectedItems={this.state.selectedItems}
              onUpldateDistribution={this.onUpldateDistribution}
              distribution={this.state.distribution}
              onUpdateOffer={this.onUpdateOffer}
              size={this.state.size}
              updateSize={this.updateSize}
              finish={this.state.finish}
              updateFinish={this.updateFinish}
            />
          </div>
        ),
        status:
          this.state.selectedItems.length > 0 &&
          this.state.finish &&
          this.state.size
            ? "finish"
            : "wait"
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
        content: (
          <OfferManager
            selectedItems={this.state.selectedItems}
            onUpdateOffer={this.onUpdateOffer}
            activeCreativeKey={this.state.activeCreativeKey}
            onUpdateActiveCreativeKey={this.onUpdateActiveCreativeKey}
          />
        ),
        status:
          this.state.selectedItems.length === 0
            ? "wait"
            : this.state.selectedItems.find(
                item => item.offerCodeType === "DYNAMIC" && !item.offer
              )
            ? "wait"
            : "finish"
      },
      {
        title: (
          <span onClick={() => this.setState({ current: 3 })}>Summary</span>
        ),
        content: (
          <Summary
            selectedItems={this.state.selectedItems}
            selectedStrategy={this.state.selectedStrategy}
          />
        ),
        status: "wait"
      }
    ];

    return (
      <div style={{ position: "relative" }}>
        <Steps
          initial={-4}
          current={current}
          style={{
            backgroundColor: "#fafafa",
            padding: "16px 48px 16px 48px",
            borderBottom: "1px solid #e8e8e8",
            position: "relative"
          }}
        >
          <div
            className="step-block"
            onClick={() => this.setState({ current: 0 })}
            style={{
              height: 64,
              width: "25%",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />
          <div
            className="step-block"
            onClick={() => this.setState({ current: 1 })}
            style={{
              height: 64,
              width: "25%",
              position: "absolute",
              top: 0,
              left: "25%"
            }}
          />
          <div
            className="step-block"
            onClick={
              this.state.hasDynamicOffer
                ? () => this.setState({ current: 2 })
                : null
            }
            style={{
              height: 64,
              width: "25%",
              position: "absolute",
              top: 0,
              left: "50%"
            }}
          />
          <div
            className="step-block"
            onClick={() => this.setState({ current: 3 })}
            style={{
              height: 64,
              width: "25%",
              position: "absolute",
              top: 0,
              left: "75%"
            }}
          />

          {steps.map((item, index) => (
            <Step
              key={index}
              title={item.title}
              status={index === this.state.current ? "process" : item.status}
              style={{ pointerEvents: "none" }}
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
              onClick={() =>
                message.success("Strategy set attached successfully!")
              }
              disabled={
                this.state.selectedItems.length === 0 ||
                !this.state.finish ||
                !this.state.size ||
                !this.state.selectedStrategy ||
                this.state.selectedItems.find(
                  item => item.offerCodeType === "DYNAMIC" && !item.offer
                )
              }
            >
              Attach Strategy Set
            </Button>
          )}
        </div>
      </div>
    );
  }
}
