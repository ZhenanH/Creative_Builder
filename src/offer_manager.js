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
    console.log(this.props.selectedItems);
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
            {this.props.selectedItems
              .filter((value, index, self) => self.indexOf(value) === index)
              .map(item => {
                return (
                  <TabPane
                    tab={
                      <CreativeCard
                        item={item}
                        reachMax={item.id !== this.state.activeKey}
                        inOfferMode={true}
                      />
                    }
                    key={item.id}
                  >
                    <div className="section-title">
                      Add Offer Code Bank to "
                      <span
                        style={{ fontWeight: 400, color: "rgba(0,0,0,0.65)" }}
                      >
                        {
                          this.props.selectedItems.find(
                            item => item.id === this.state.activeKey
                          ).creativeName
                        }
                        "
                      </span>{" "}
                    </div>
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
                  </TabPane>
                );
              })}
          </Tabs>
        )}
      </div>
    );
  }
}
