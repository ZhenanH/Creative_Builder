import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import React from "react";
import { Slider, DatePicker, Button } from "antd";
import moment from "moment";
import { CreativeCard } from "./creative_card";

const dateFormat = "MM/DD/YYYY";
const creativeTrayPadding = 60;

const SortableItem = SortableElement(
  ({
    value,
    onRemove,
    reachMax,
    onDuplicate,
    removeDuplicate,
    items,
    onEnterCodeDesign
  }) => (
    <div
      style={{
        position: "relative",
        backgroundColor: "lightgray",
        width: 240,
        height: 252,
        zIndex: 100,
        margin:
          0.5 * creativeTrayPadding + "px 0 " + creativeTrayPadding + "px 0"
      }}
    >
      <a>
        <Button
          onClick={e => {
            console.log("click a");
            if (items.filter(item => item === value).length > 1) {
              removeDuplicate(value);
            } else {
              onRemove(value);
            }
          }}
          icon="close"
          style={{
            position: "absolute",
            right: -0,
            top: -40,
            zIndex: 10,
            border: "0px solid",
            backgroundColor: "rgba(0,0,0,0)"
          }}
        />
      </a>
      {!reachMax && (
        <a>
          <Button
            onClick={() => {
              onDuplicate(value);
            }}
            icon="copy"
            style={{
              position: "absolute",
              right: 20,
              top: -40,
              zIndex: 10,
              border: "0px solid",
              backgroundColor: "rgba(0,0,0,0)"
            }}
          />
        </a>
      )}
      <CreativeCard
        item={value}
        selectedItems={items}
        isInTray={true}
        onEnterCodeDesign={onEnterCodeDesign}
      />
    </div>
  )
);

const SortableList = SortableContainer(
  ({
    items,
    onRemove,
    reachMax,
    onDuplicate,
    removeDuplicate,
    onEnterCodeDesign
  }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            onRemove={onRemove}
            reachMax={reachMax}
            onDuplicate={onDuplicate}
            removeDuplicate={removeDuplicate}
            items={items}
            onEnterCodeDesign={onEnterCodeDesign}
          />
        ))}
      </div>
    );
  }
);

const creativePlaceHolder = num => {
  let text = "creative";
  if (num === 1) text = "1 st creative";
  if (num === 2) text = "Another creative";
  if (num === 3) text = "Another creative";
  return (
    <div
      style={{
        border: "1px dashed lightgray",
        width: 240,
        height: 252,
        margin:
          0.5 * creativeTrayPadding + "px 0 " + creativeTrayPadding + "px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(0,0,0,0.45)"
      }}
    >
      {text}
    </div>
  );
};

const startDate = moment()
  .startOf("month")
  .format("L");
const endDate = moment()
  .endOf("month")
  .format("L");
const dur = moment
  .duration({ from: moment(startDate), to: new Date() })
  .asDays();

const getProgress = date => {
  return Math.round(
    100 *
      (1 -
        moment.duration({ from: moment(startDate), to: date }).asDays() /
          moment
            .duration({ from: moment(startDate), to: moment(endDate) })
            .asDays())
  );
};
export class CreativeTray extends React.Component {
  state = {
    items: this.props.items || [],
    creative2date: moment(startDate, dateFormat).add(15, "days"),
    creative3date: moment(startDate, dateFormat).add(20, "days")
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
    if (this.state.items.length !== nextState.items.length) {
      this.props.onUpateSelectedNum(nextState.items);
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };

  onDuplicate = item => {
    this.setState({ items: this.state.items.concat([item]) });
  };

  removeDuplicate = item => {
    let tempItems = this.state.items.slice(0);
    tempItems.splice(this.state.items.findIndex(i => i === item), 1);
    this.setState({ items: tempItems });
  };

  render() {
    let progress = Math.round(
      100 *
        (1 -
          dur /
            moment
              .duration({ from: moment(startDate), to: moment(endDate) })
              .asDays())
    );

    if (this.props.distribution === 2) {
      if (this.props.items.length === 2) {
        if (moment().isAfter(this.state.creative2date)) {
          progress = 2.5;
        } else {
          progress = 52.5;
        }
      }
      if (this.props.items.length === 3) {
        if (moment().isAfter(this.state.creative3date)) {
          progress = 2.5;
        } else if (moment().isAfter(this.state.creative2date)) {
          progress = 35.5;
        } else {
          progress = 68.5;
        }
      }
    }

    const maxSelection = 3;
    const reachMax = this.state.items.length >= maxSelection;
    let sliderHeight =
      (252 + creativeTrayPadding) *
      (this.props.items.length === 0 ? 1 : this.props.items.length);
    let marks = {};
    let values = [];
    if (this.props.items.length <= 1) {
      if (this.props.distribution >= 2) {
        values = [progress, 100];
        marks = {
          0: "",
          100: {
            label: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 16
                }}
              >
                {startDate}{" "}
                <span className="start-end-label">FLIGHT START</span>
              </div>
            )
          }
        };
      } else {
        values = [progress, 100];
        marks = {
          0: "",
          100: {
            label: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 16
                }}
              >
                {startDate}{" "}
                <span className="start-end-label">FLIGHT START 1</span>
              </div>
            )
          }
        };
      }
    } else if (this.props.items.length === 2) {
      values = [progress, 100];
      marks = {
        0: (
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
          >
            {endDate} <span className="start-end-label">FLIGHT END</span>
          </div>
        ),
        49.5: {
          style: { marginBottom: "-50%" },
          label: (
            <DatePicker
              size="small"
              value={this.state.creative2date}
              format={dateFormat}
              style={{ width: 140, zIndex: 1, marginLeft: 16 }}
              disabledDate={current =>
                current && current < moment().endOf("day")
              }
              onChange={value => {
                this.setState({ creative2date: value });
              }}
            />
          )
        },
        100: {
          label: (
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
            >
              {startDate} <span className="start-end-label">FLIGHT START</span>
            </div>
          )
        }
      };
    } else if (this.props.items.length === 3) {
      values = [progress, 100];
      marks = {
        0: (
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
          >
            {endDate} <span className="start-end-label">FLIGHT END</span>
          </div>
        ),
        33: {
          style: { marginBottom: "-50%" },
          label: (
            <DatePicker
              size="small"
              value={this.state.creative3date}
              format={dateFormat}
              style={{ width: 140, zIndex: 1, marginLeft: 16 }}
              disabledDate={current =>
                current && current < this.state.creative2date.endOf("day")
              }
              onChange={value => {
                this.setState({ creative3date: value });
              }}
            />
          )
        },
        66.5: {
          style: { marginBottom: "-50%" },
          label: (
            <DatePicker
              size="small"
              value={this.state.creative2date}
              format={dateFormat}
              style={{ width: 140, zIndex: 1, marginLeft: 16 }}
              disabledDate={current =>
                current && current < moment().endOf("day")
              }
              onChange={value => {
                this.setState({ creative2date: value });
              }}
            />
          )
        },
        100: {
          label: (
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
            >
              {startDate} <span className="start-end-label">FLIGHT START</span>
            </div>
          )
        }
      };
    }

    if (this.props.distribution === 1) {
      sliderHeight = 252 + creativeTrayPadding;
      values = [progress, 100];
      marks = {
        0: (
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
          >
            <span className="start-end-label" style={{ marginLeft: 0 }}>
              FLIGHT END
            </span>
          </div>
        ),
        100: {
          label: (
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
            >
              <span className="start-end-label" style={{ marginLeft: 0 }}>
                FLIGHT START
              </span>
            </div>
          )
        }
      };
    }

    if (this.props.distribution === 3) {
      progress = 0;
      if (this.props.items.length <= 2) {
        values = [progress, 100];
        marks = {
          0: (
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
            >
              <span className="start-end-label" style={{ marginLeft: 0 }}>
                FLIGHT END
              </span>
            </div>
          ),
          100: {
            label: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 16
                }}
              >
                <span className="start-end-label" style={{ marginLeft: 0 }}>
                  FLIGHT START
                </span>
              </div>
            )
          }
        };
      } else {
        values = [progress, 100];
        marks = {
          0: (
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
            >
              <span className="start-end-label" style={{ marginLeft: 0 }}>
                FLIGHT END
              </span>
            </div>
          ),
          100: {
            label: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 16
                }}
              >
                <span className="start-end-label" style={{ marginLeft: 0 }}>
                  FLIGHT START
                </span>
              </div>
            )
          }
        };
      }
    }

    return (
      <div style={{ display: "flex", margin: "34px 0 24px 0" }}>
        <div style={{ height: sliderHeight }}>
          <Slider
            tipFormatter={value => {
              if (value !== 100) {
                return (
                  <span style={{ fontSize: 12 }}>
                    Today: {moment().format(dateFormat)}
                  </span>
                );
              } else {
                return null;
              }
            }}
            vertical
            range
            marks={marks}
            value={values}
          />
        </div>
        <div
          style={{
            position: "relative",
            left: 12,
            minHeight:
              252 *
                (this.props.items.length === 3
                  ? 3
                  : this.props.items.length + 1) +
              128
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0
              //zIndex: -1
            }}
          >
            {creativePlaceHolder()}
            {this.state.items.map((item, index) => {
              if (this.state.items.length === 0) {
              } else if (this.state.items.length < 3) {
                if (index >= 0) {
                  return creativePlaceHolder(index + 2);
                }
              }
            })}
          </div>
          <SortableList
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            lockAxis={"y"}
            onRemove={this.props.onRemoveSelectedItem}
            onDuplicate={this.onDuplicate}
            removeDuplicate={this.removeDuplicate}
            reachMax={reachMax}
            onEnterCodeDesign={this.props.onEnterCodeDesign}
          />
        </div>
      </div>
    );
  }
}
