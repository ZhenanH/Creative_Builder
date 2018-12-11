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
    return (
      <div style={{ padding: "24px 24px 24px 0" }}>
        {this.props.selectedItems.length === 0 ? (
          <div style={{ color: "rgba(0,0,0,0.45)", textAlign: "center" }}>
            Please select creative
          </div>
        ) : (
          <Tabs
            activeKey={this.state.activeKey}
            tabPosition={"left"}
            style={{}}
            onChange={activeKey => {
              this.setState({ activeKey });
              this.props.onUpdateActiveCreativeKey(activeKey);
            }}
          >
            {this.props.selectedItems.map(item => {
              return (
                <TabPane
                  tab={
                    <CreativeCard
                      item={item}
                      reachMax={item.id !== this.state.activeKey}
                    />
                  }
                  key={item.id}
                >
                  <div className="section-title">Add Offer Code Bank </div>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Saved Offer Code Bank" key="1">
                      <OfferList
                        onUpdateOffer={this.props.onUpdateOffer}
                        activeCreative={this.props.selectedItems.find(
                          item => item.id === this.state.activeKey
                        )}
                      />
                    </TabPane>
                    <TabPane tab="Create New Offer Code Bank" key="2">
                      Strategy builder
                    </TabPane>
                  </Tabs>
                  <div className="section-title">Customize Offer Code </div>
                  <div
                    style={{
                      height: 400,
                      backgroundColor: "#e8e8e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    Coming soon
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        )}
      </div>
    );
  }
}
