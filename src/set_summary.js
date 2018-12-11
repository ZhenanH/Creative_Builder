import React from "react";
import { Icon, Table, Tag, Progress } from "antd";
import Ellipsis from "ant-design-pro/lib/Ellipsis";
import "ant-design-pro/dist/ant-design-pro.css";

export class Summary extends React.Component {
  render() {
    const columns = [
      {
        title: "photo",
        dataIndex: "url",
        key: "url",
        width: "10",
        render: url => (
          <div
            style={{
              height: 48,
              width: 48,
              backgroundImage: "url(" + url + ")",
              backgroundSize: "cover"
            }}
          />
        )
      },
      {
        title: "Name",
        dataIndex: "name",
        width: "50%",
        key: "name",
        render: name => (
          <div style={{}}>
            <div style={{ fontSize: 15, marginBottom: 8 }}>
              <Ellipsis tooltip lines={1}>
                {name}
              </Ellipsis>
            </div>

            <div style={{ color: "rgba(0,0,0,0.45)" }}>
              <span>2 Panels</span>
              <span style={{ marginLeft: 12 }}>
                12/31/2018
                <Icon
                  style={{ color: "#52c41a", marginLeft: 4 }}
                  type="clock-circle"
                />
              </span>
              <span style={{ marginLeft: 12 }}>
                status:
                <Icon
                  type="check-circle"
                  style={{ color: "#52c41a", marginLeft: 4 }}
                />
              </span>
              <span style={{ marginLeft: 12 }}>
                <Icon type="eye" style={{ marginLeft: 4 }} />
              </span>
              <span style={{ color: "rgba(0,0,0,0.45)", marginLeft: 12 }}>
                {"#" + Math.round(Math.random() * 10000)}
              </span>
            </div>
          </div>
        )
      },
      {
        title: "Offer",
        dataIndex: "actions",
        key: "actions",
        width: "40%",
        render: (value, record) => (
          <div>
            <div style={{ marginBottom: 12, width: "100%" }}>
              {record.offer ? (
                <Ellipsis tooltip lines={1}>
                  {record.offer.offer}
                </Ellipsis>
              ) : (
                <span style={{ color: "rgba(0,0,0,0.35)" }}>
                  no offer code bank attached
                </span>
              )}
            </div>
            {record.offer
              ? [
                  <Progress
                    key={1}
                    type="circle"
                    percent={30}
                    width={36}
                    style={{ marginRight: 12 }}
                    strokeColor="#F5A622"
                  />,
                  <Progress
                    key={2}
                    type="circle"
                    percent={70}
                    width={36}
                    style={{ marginRight: 12 }}
                    strokeColor="#B8E986"
                  />,
                  <Progress
                    key={3}
                    type="circle"
                    percent={90}
                    width={36}
                    style={{ marginRight: 12 }}
                  />
                ]
              : null}
          </div>
        )
      }
    ];

    const items = this.props.selectedItems;
    const dataSource = items.map((item, index) => {
      return {
        key: item.id,
        name: "2018-4_PC_WPR_Adult_Targeting-creative",
        actions: 32,
        url: item.urls.small,
        offer: item.offer
      };
    });

    return (
      <div style={{ display: "flex", padding: 12 }}>
        {this.props.selectedStrategy ? (
          <div style={{ width: 250, margin: 12 }}>
            <div style={{ fontWeight: "bold" }}>Strategy</div>
            <div style={{ margin: "8px 0 8px 0", wordWrap: "break-word" }}>
              {this.props.selectedStrategy.strategy}
            </div>
            <div style={{ fontWeight: "bold", marginTop: 16 }}>Targeting</div>
            <div style={{ margin: "8px 0 8px 0" }}>
              <Tag color="blue">WHO</Tag>
              <Tag color="blue">WHAT</Tag>
              <Tag color="rgba(0,0,0,0.15)">WHERE</Tag>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 250,
              margin: 14,
              color: "rgba(0,0,0,0.45)",
              textAlign: "center"
            }}
          >
            No strategy selected
          </div>
        )}
        <div style={{ flex: 1, borderLeft: "1px solid #e8e8e8" }}>
          {this.props.selectedItems.length > 0 && (
            <div
              style={{
                display: "flex",
                fontWeight: "bold",
                margin: "12px 0 0 24px"
              }}
            >
              <div style={{ width: 80 }}>Creative</div>
              <div style={{ width: "calc(50% - 12px)" }} />
              <div>Offer</div>
            </div>
          )}
          <style>
            {`
              tr:last-of-type > td 
              {
              border-bottom: 0px solid black;
              }
              .ant-table-placeholder {
                border-bottom: 0px
              }
              `}
          </style>
          <Table
            style={{ margin: "0 12px 0 12px" }}
            pagination={false}
            className={"creative-table"}
            dataSource={dataSource}
            columns={columns}
            showHeader={false}
            locale={{ emptyText: "No creative attached" }}
          />
        </div>
      </div>
    );
  }
}
