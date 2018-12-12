import React from "react";
import { CreativeCard } from "./creative_card";
import { Input, Table, Icon, Pagination } from "antd";

const Search = Input.Search;

const columns = [
  {
    title: "photo",
    dataIndex: "url",
    key: "url",
    width: 60,
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
    key: "name",
    render: name => (
      <div style={{}}>
        <div style={{ fontSize: 15 }}>
          {name}{" "}
          <span style={{ color: "rgba(0,0,0,0.45)", marginLeft: 12 }}>
            {"#" + Math.round(Math.random() * 10000)}
          </span>
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
        </div>
      </div>
    )
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => (
      <div className={"creative-actions"} style={{ display: "flex" }}>
        <Icon style={{ marginLeft: 12 }} type="eye" />
        <Icon style={{ marginLeft: 12 }} type="edit" />
        <Icon style={{ marginLeft: 12 }} type="delete" />
        <Icon style={{ marginLeft: 12 }} type="book" />
      </div>
    )
  }
];

const arr_diff = (a1, a2) => {
  var a = [],
    diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
};

export class CreativeGrid extends React.Component {
  state = {
    layout: "grid",
    selectedRowKeys: this.props.selectedItems.map(item => item.id),
    pageSize: 9,
    current: 1
  };

  onPageSizeChange = (current, pageSize) => {
    this.setState({ pageSize: pageSize, current: current });
  };
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.selectedItems !== this.props.selectedItems) {
      this.setState({
        selectedRowKeys: nextProps.selectedItems.map(item => item.id)
      });
    }
    if (nextProps.items !== this.props.items) {
      this.setState({
        items: nextProps.items
      });
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
    const selectedItemKey = arr_diff(
      this.state.selectedRowKeys,
      selectedRowKeys
    )[0];
    this.props.onSelectCreative(
      this.props.items.filter(item => item.id === selectedItemKey)[0],
      this.state.selectedRowKeys.length < selectedRowKeys.length
    );
  };

  selectRow = record => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      if (this.props.selectedItems.length < 3) {
        selectedRowKeys.push(record.key);
      }
    }
    this.setState({ selectedRowKeys });
    const selectedItemKey = arr_diff(
      this.state.selectedRowKeys,
      selectedRowKeys
    )[0];

    this.props.onSelectCreative(
      this.props.items.filter(item => item.id === selectedItemKey)[0],
      this.state.selectedRowKeys.length < selectedRowKeys.length
    );
  };

  render() {
    //console.log("grid",this.props);
    const items = this.props.items || [
      "item1",
      "item2",
      "item3",
      "item4",
      "item5",
      "item6"
    ];

    const dataSource = items.map((item, index) => {
      return {
        key: item.id,
        name: "2018-4_PC_WPR_Adult_Targeting-creative",
        actions: 32,
        url: item.urls.small
      };
    });

    const maxSelection = 3;

    const onLayoutChange = layout => {
      this.setState({ layout: layout });
    };

    const getDisabled = record => {
      let isDisabled = false;

      if (this.state.selectedRowKeys.length === 3) {
        isDisabled = this.state.selectedRowKeys.indexOf(record.key) < 0;
      } else {
        isDisabled = false;
      }

      return isDisabled;
    };

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: getDisabled(record) // Column configuration not to be checked
        //name: record.name
      })
    };

    return (
      <div style={{ margin: "12px 12px 12px 12px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <div style={{ fontWeight: "bold", marginLeft: 12 }}>
            {"Select up to " + maxSelection + " creatives"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <Search
            placeholder="Search for creatives"
            onSearch={value => console.log(value)}
            style={{ width: 240, marginLeft: 12 }}
          />
          <span style={{ flex: 1 }} />
          <div style={{ display: "flex", marginRight: 12 }}>
            <Icon
              type="appstore"
              className={
                this.state.layout === "grid"
                  ? "layout-button layout-button-active"
                  : "layout-button"
              }
              onClick={() => onLayoutChange("grid")}
            />
            <Icon
              type="bars"
              className={
                this.state.layout === "list"
                  ? "layout-button layout-button-active"
                  : "layout-button"
              }
              onClick={() => onLayoutChange("list")}
            />
          </div>
          <Pagination
            size="small"
            total={this.props.total}
            current={this.state.current}
            pageSize={this.state.pageSize}
            showSizeChanger
            onShowSizeChange={this.onPageSizeChange}
            onChange={this.onPageSizeChange}
            pageSizeOptions={["6", "12", "24"]}
          />
        </div>
        {this.state.layout === "list" && (
          <Table
            pagination={{ size: "small", showSizeChanger: true }}
            className={"creative-table"}
            dataSource={dataSource}
            columns={columns}
            showHeader={false}
            rowSelection={rowSelection}
            onRow={record => ({
              onClick: () => {
                this.selectRow(record);
              }
            })}
          />
        )}
        {this.state.layout === "grid" && (
          <div className="cretive-gridview">
            {items.map((item, index) => {
              if (
                index <= this.state.pageSize * this.state.current &&
                index > this.state.pageSize * (this.state.current - 1)
              )
                return (
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      width: 240,
                      height: 252,
                      margin: 12,
                      display: "inline-block"
                    }}
                  >
                    <CreativeCard
                      key={index}
                      selectable
                      onSelectCreative={this.props.onSelectCreative}
                      item={item}
                      selectedItems={this.props.selectedItems}
                      maxSelection={maxSelection}
                    />
                  </div>
                );
            })}
          </div>
        )}
        <div
          style={{
            display: this.state.layout === "list" ? "none" : "flex",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <Pagination
            size="small"
            total={this.props.total}
            pageSize={this.state.pageSize}
            showSizeChanger
            onShowSizeChange={this.onPageSizeChange}
            pageSizeOptions={["6", "12", "24"]}
            current={this.state.current}
            onChange={this.onPageSizeChange}
          />
        </div>
      </div>
    );
  }
}
