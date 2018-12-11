import React from "react";
import { Table, Progress } from "antd";
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
  },
  {
    key: 3,
    offer: "NEW_COMBINED_BANK_RXBAR_AUG_OCT_20%OFF",
    targeting: "12/31/2018",
    time: "12/10/2018 4:17pm"
  },
  {
    key: 4,
    offer: "NEW_2_RXBAR_CouponCodes_JulyFlight",
    targeting: "12/31/2018",
    time: "12/10/2018 5:17pm"
  },
  {
    key: 5,
    offer: "New_1_RXBAR_CouponCodes_JulyFlight",
    targeting: "12/31/2018",
    time: "12/10/2018 5:17pm"
  }
];

const columns = [
  {
    title: "Offer Bank",
    dataIndex: "offer",
    key: "offer"
  },
  {
    title: "Availibility",
    dataIndex: "targeting",
    key: "targeting",
    render: () => (
      <div>
        <Progress
          key={1}
          type="circle"
          percent={30}
          width={36}
          style={{ marginRight: 12 }}
          strokeColor="#F5A622"
        />
        <Progress
          key={2}
          type="circle"
          percent={70}
          width={36}
          style={{ marginRight: 12 }}
          strokeColor="#B8E986"
        />
        <Progress
          key={3}
          type="circle"
          percent={90}
          width={36}
          style={{ marginRight: 12 }}
        />
      </div>
    )
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
