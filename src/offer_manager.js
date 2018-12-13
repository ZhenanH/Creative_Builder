import React from "react";
import { Tabs } from "antd";
import { OfferList } from "./offer_list";
import { CreativeCard } from "./creative_card";
const TabPane = Tabs.TabPane;

export class OfferManager extends React.Component {
  state = {
    activeKey:
      this.props.selectedItems.length === 1
        ? this.props.selectedItems[0]["id"]
        : this.props.activeCreativeKey
        ? this.props.activeCreativeKey
        : this.props.selectedItems.length > 0
        ? this.props.selectedItems[0]["id"]
        : null
  };

  render() {
    let currentItem = this.props.selectedItems.find(
      item => item.id === this.state.activeKey
    );
    if (!currentItem && this.props.selectedItems.length !== 0) {
      currentItem = this.props.selectedItems[0];
      this.setState({ activeKey: currentItem.id });
    }
    return (
      <div style={{ padding: "24px 24px 24px 0" }}>
        {this.props.selectedItems.length === 0 ? (
          <div style={{ color: "rgba(0,0,0,0.45)", textAlign: "center" }}>
            Please select creative
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <style>
              {`
              .highlightedTabs > .ant-tabs-bar .ant-tabs-tab-active {
                background-color:#e6f7ff;
              }
               `}
            </style>
            <Tabs
              className={"highlightedTabs"}
              activeKey={this.state.activeKey}
              tabPosition={"left"}
              style={{ minWidth: 320, maxWidth: 320 }}
              onChange={activeKey => {
                this.setState({ activeKey });
                this.props.onUpdateActiveCreativeKey(activeKey);
              }}
            >
              {this.props.selectedItems
                .filter((value, index, self) => self.indexOf(value) === index)
                .map(item => {
                  return (
                    <TabPane
                      tab={
                        <CreativeCard
                          item={item}
                          isActive={item.id === this.state.activeKey}
                          isInTray={true}
                        />
                      }
                      key={item.id}
                    />
                  );
                })}
            </Tabs>
            <div style={{ flex: 1, maxWidth: "calc(100% - 320px)" }}>
              <style>
                {`
                  .invisibleTabs > .ant-tabs-top-bar {
                    display:none;
                  }
                `}
              </style>
              {currentItem.offerCodeType === "DYNAMIC" ? (
                <div className="section-title">
                  Add Offer Code Bank to "
                  <span style={{ fontWeight: 400, color: "rgba(0,0,0,0.65)" }}>
                    {currentItem.creativeName}
                  </span>
                </div>
              ) : (
                <div className="section-title">No offer code bank needed</div>
              )}
              <Tabs
                className={"invisibleTabs"}
                activeKey={this.state.activeKey}
                onChange={key => {
                  this.setState({ activeKey: key });
                }}
              >
                {this.props.selectedItems.map(item => {
                  if (item.offerCodeType === "DYNAMIC") {
                    return (
                      <TabPane tab={item.id} key={item.id}>
                        <Tabs defaultActiveKey="1">
                          <TabPane tab="Saved Offer Code Bank" key="1">
                            <OfferList
                              onUpdateOffer={this.props.onUpdateOffer}
                              activeCreative={item}
                            />
                          </TabPane>
                          <TabPane tab="Create New Offer Code Bank" key="2">
                            Strategy builder
                          </TabPane>
                        </Tabs>
                      </TabPane>
                    );
                  } else {
                    return (
                      <TabPane tab={item.id} key={item.id}>
                        You are all set
                      </TabPane>
                    );
                  }
                })}
              </Tabs>
            </div>
          </div>
        )}
      </div>
    );
  }
}
