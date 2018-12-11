import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";
//const dateFormat = "MM/DD/YYYY";
const dataSource = [
  {
    key: 0,
    offer: "NEW_COMBINED_BANK_RXBAR_AUG_OCT_20%OFF",
    targeting: "12/31/2018",
    time: moment().fromNow()
  },
  {
    key: 1,
    offer: "NEW_2_RXBAR_CouponCodes_JulyFlight",
    targeting: "12/31/2018",
    time: moment()
      .startOf("day")
      .fromNow()
  },
  {
    key: 2,
    offer: "New_1_RXBAR_CouponCodes_JulyFlight",
    targeting: "12/31/2018",
    time: "12/11/2018 3:17pm"
  }
];

const columns = [
  {
    title: "Offer Bank",
    dataIndex: "offer",
    key: "offer"
  },
  {
    title: "Expiration",
    dataIndex: "targeting",
    key: "targeting"
  },
  {
    title: "Availability",
    dataIndex: "time",
    key: "time"
  }
];

export class OfferList extends React.Component {
  state = {
    selectedRowKeys: this.props.activeCreative.offer
      ? [this.props.activeCreative.offer.key]
      : []
  };

  onSelectChange = selectedRowKeys => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
    this.props.onUpdateOffer(
      this.props.activeCreative,
      dataSource[selectedRowKeys[0]]
    );
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div>
        <Table
          size="small"
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}
