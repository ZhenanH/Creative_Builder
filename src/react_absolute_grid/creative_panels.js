"use strict";

import React from "react";
import ReactDOM from "react-dom";
// import Perf from 'react-addons-perf';
import * as _ from "lodash";
import createAbsoluteGrid from "./absolute_grid";
import DndGrid from "./dnd_grid.js";
import PanelContainer from "./grid_container.js";
import { Slider, Icon, Tooltip } from "antd";
export class CreativePanels extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  /**
   * This demo is meant to show you all of the things that are possible with ReactAbsoluteGrid
   * If implemented in a Flux project, the grid would be in a render method with the
   * event handlers calling Actions which would update a Store. For the sake of brevity,
   * the "store" is implemented locally and the changes re-rendered manually
   *
   * TODO: implement inside a react component rather than doing this all manually
   **/

  demo = (host, host_back, zoomEle, panels, items, orientation) => {
    let sampleItems = [];
    if (items) {
      for (var i = 0; i < panels; i++) {
        sampleItems.push({
          url: items[i] ? items[i].url : null,
          sort: i + 1,
          key: i + 1
        });
      }
    } else {
      sampleItems = [
        {
          url: "https://dl.dropboxusercontent.com/s/gyf1pu3e29n7p52/1.jpg?dl=0",
          name: "login",
          sort: 1,
          key: 1
        },
        {
          url: "https://dl.dropboxusercontent.com/s/5z3i3h7874x9900/2.jpg?dl=0",
          name: "signup",
          sort: 2,
          key: 2
        },
        {
          url: "https://dl.dropboxusercontent.com/s/sp962r5izjxt9dz/3.jpg?dl=0",
          name: "walkthrough",
          sort: 3,
          key: 3
        },
        {
          url: "https://dl.dropboxusercontent.com/s/fc5y675onrjoaf4/4.jpg?dl=0",
          name: "home",
          sort: 4,
          key: 4
        },
        {
          url: "https://dl.dropboxusercontent.com/s/mvfu3kkbokqkhkd/5.jpg?dl=0",
          name: "calendar",
          sort: 5,
          key: 5
        },
        {
          url: "https://dl.dropboxusercontent.com/s/b4e3gpgtjcxrev9/6.jpg?dl=0",
          name: "overview",
          sort: 6,
          key: 6
        },
        {
          url: "https://dl.dropboxusercontent.com/s/pyyhclzhkuoltva/7.jpg?dl=0",
          name: "overview",
          sort: 7,
          key: 7
        },
        {
          url: "https://dl.dropboxusercontent.com/s/kk4mrmfh4op4hbw/8.jpg?dl=0",
          name: "overview",
          sort: 8,
          key: 8
        }
      ];
    }
    let rerender;
    let rezoom;
    let zoom = 0.7;

    //We set a property on each item to let the grid know not to show it
    var onFilter = function (event) {
      var search = new RegExp(event.target.value, "i");
      sampleItems = sampleItems.map(function (item) {
        const isMatched = !item.name.match(search);
        if (!item.filtered || isMatched !== item.filtered) {
          return {
            ...item,
            filtered: isMatched
          };
        }
        return item;
      });
      rerender();
    };

    //Change the item's sort order
    var onMove = function (source, target) {
      source = _.find(sampleItems, { key: parseInt(source, 10) });
      target = _.find(sampleItems, { key: parseInt(target, 10) });

      const targetSort = target.sort;

      //CAREFUL, For maximum performance we must maintain the array's order, but change sort
      sampleItems = sampleItems.map(function (item) {
        //Decrement sorts between positions when target is greater
        if (item.key === source.key) {
          return {
            ...item,
            sort: targetSort
          };
        } else if (
          target.sort > source.sort &&
          (item.sort <= target.sort && item.sort > source.sort)
        ) {
          return {
            ...item,
            sort: item.sort - 1
          };
          //Increment sorts between positions when source is greater
        } else if (item.sort >= target.sort && item.sort < source.sort) {
          return {
            ...item,
            sort: item.sort + 1
          };
        }
        return item;
      });
      //Perf.start();
      rerender();
      //Perf.stop();
      //Perf.printWasted();
    };

    var onMoveDebounced = _.debounce(onMove, 40);
    //console.log(createAbsoluteGrid);

    const AbsoluteGrid = createAbsoluteGrid(DndGrid, {
      panels: panels,
      orientation: orientation
    });
    const PlaceHolder = createAbsoluteGrid(PanelContainer, {
      panels: panels,
      orientation: orientation
    });
    rerender = function () {
      ReactDOM.render(
        <div>
          <AbsoluteGrid
            items={sampleItems}
            onMove={onMoveDebounced}
            dragEnabled={true}
            zoom={zoom}
            responsive={true}
            verticalMargin={42}
            itemWidth={orientation === "Protrait" ? 250 : (250 * 1875) / 1350}
            itemHeight={orientation === "Protrait" ? (250 * 1875) / 1350 : 250}
          />
        </div>,
        host
      );
    };

    rezoom = function () {
      ReactDOM.render(
        <div>
          <PlaceHolder
            items={sampleItems}
            onMove={onMoveDebounced}
            //dragEnabled={true}
            zoom={zoom}
            responsive={true}
            verticalMargin={42}
            itemWidth={orientation === "Protrait" ? 250 : (250 * 1875) / 1350}
            itemHeight={orientation === "Protrait" ? (250 * 1875) / 1350 : 250}
          />
        </div>,
        host_back
      );
    };
    var renderDebounced = _.debounce(rerender, 150);
    var renderDebouncedZoom = _.debounce(rezoom, 150);
    //Update the zoom value
    var onZoom = function (value) {
      zoom = parseFloat(value);
      renderDebounced();
      renderDebouncedZoom();
    };

    ReactDOM.render(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: this.props.items.length <= 0 ? 0 : 1
        }}
      >
        <Icon type="zoom-out" style={{ color: "rgba(0,0,0,0.35)" }} />{" "}
        <Slider
          disabled={this.props.items.length <= 0}
          tipFormatter={null}
          onChange={onZoom}
          min={0.7}
          max={2.5}
          step={0.1}
          defaultValue={zoom}
          style={{ width: "200px", margin: "0 12px 0 12px" }}
        />{" "}
        <Icon type="zoom-in" style={{ color: "rgba(0,0,0,0.35)" }} />
      </div>,
      zoomEle
    );

    rerender();
    rezoom();
  };

  componentWillUpdate(nextProps, nextState) {
    // console.log("nextProps", nextProps);
  }
  render() {
    //console.log("panels", this.props.items);
    this.demo(
      this.props.host,
      this.props.host_back,
      this.props.zoom,
      this.props.panels,
      this.props.items,
      this.props.orientation
    );
    return null;
  }
}
