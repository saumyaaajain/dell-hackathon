import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import {Col, Container, Row} from "react-bootstrap";
import './App.css';
import logo from './logo192.png';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import image1 from "./download.jpeg";
import Image from './Card/men.jpg';
import Image1 from './Card/graphic.jpg';
import ButtonComp from './Button/Button';
import NormalImg from './NormalImg/NormalImg';
import Card from './Card/Card';
import Table from './Table/Table';
import FlipClock from 'x-react-flipclock';
import Iframe from 'react-iframe'


import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let layout = [
  { i: "1", w: 2, h: 3, x: 0, y: 0, label: "som", static: false, isResizable: true },
  { i: '2', w: 2, h: 5, x: 0, y: 3, static: false, isResizable: true },
  { i: '3', w: 2, h: 3, x: 0, y: 8, isResizable: true },
  { i: '4', w: 2, h: 10.25, x: 0, y: 11, minH: 10.25, minW: 4, maxH: 10.25, maxW: 4 },
  { i: '5', w: 3, h: 5, x: 0, y: 22, minH: 5, minW: 3, maxH: 5, maxW: 3, static: true },
  { i: '6', w: 2, h: 3, x: 0, y: 33, isResizable: false },
  { i: '7', w: 2, h: 3, x: 0, y: 36, isResizable: true },
  { i: '8', w: 2, h: 3, x: 0, y: 39, isResizable: true },
  { i: '9', x: 0, y: 41, w: 3, h: 11, minH: 11, minW: 3, static: false },
  { i: '10', x: 0, y: 52, w: 3, h: 11, minH: 11, minW: 3, static: false },
  { i: '11', x: 0, y: 63, w: 2.8, h: 5.3, isResizable: true },
  { i: '12', x: 0, y: 69, w: 5, h: 10, minH: 10, minW: 5, isResizable: true },
  { i: '13', x: 0, y: 75, w: 10, h: 6, isResizeable: false },
  { i: '14', x: 0, y: 81, w: 10, h: 6, isResizeable: false },
  { i: '15', x: 0, y: 87, w: 10, h: 6, isResizeable: false },
];
const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("rgl-7", "layout") || layout;
const originalPieValue = getFromLS("rgl-8", "pie") || new Array(14).fill(0);
const text = getFromLS("rgl-9", "tab") || " ";
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class App extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function () { },


  };


  constructor(props) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
      itemArray: [],
      urlArray:[],
      inputValue: '',
      map: new Map(),
      dataForPie: originalPieValue,
      name: "",
      tabText: text,
      content: "",
      urlContent: "",
      delItems: []

    };


    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.createProject = this.createProject.bind(this);
    this.createURL = this.createURL.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.editText = this.editText.bind(this);
  }


  resetLayout() {
    this.setState({
      layout: layout
    });
  }

  dataForPieChart(key) {
    console.log("called1");
    let data = this.state.dataForPie;
    data[key - 1] += 1;
    this.setState({ dataForPie: data });
    saveToLS("rgl-8", "pie", data);
    console.log("hh" + data);

  }


  onLayoutChange(layout) {

    /*eslint no-console: 0*/
    console.log(layout);
    saveToLS("rgl-7", "layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  createProject() {
    let ans = prompt("Enter content - ");
    console.log('called', this.state.itemArray)
    const items = this.state.itemArray;
    const title = '';
    const text = "hh";
    items.push({ title, text })
    this.setState({ content: ans })
    this.setState({ itemArray: items })
    console.log("it"+items)

  }
  createURL() {
    let url = prompt("Enter URL: ");
    let title = prompt("Enter content: ");
    let imageUrl = prompt("Enter image URL: ");
    if(url && title && imageUrl) {
      const items = this.state.urlArray;
      items.push({title, url, imageUrl})
      this.setState({urlArray: items})
    }
  }

  deleteProject() {
    const items = this.state.itemArray
    items.pop()
    this.setState({ itemArray: items })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true
    }
    if (this.props !== nextProps) {
      return true
    }
  }
  editText() {
    let txt = prompt("Type your text");
    this.setState({ tabText: txt });
    saveToLS("rgl-9", "tab", txt);
  }

  render() {
    let children = this.state.itemArray.map((item, index) => {
      return (
          <div key={index + 100} data-grid={{ w: 2, h: 3, x: 8, y: 0 }} onDragEnd={() => this.dataForPieChart(index + 8)}>
            <span className="text">{this.state.content}</span>
          </div>
      )
    })
    let urls = this.state.urlArray.map((item, index) => {
      return (
          <div key={index + 100} data-grid={{ w: 2, h: 3, x: 8, y: 0 }} onDragEnd={() => this.dataForPieChart(index + 8)}>
            <a href={item.url} className="text"><img src={item.imageUrl} title={item.title} alt="Flower" /></a>
          </div>
      )
    })
    const options = {
      theme: "dark2",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title: {
        text: "Movements of Elements In Pie Chart"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        indexLabelPlacement: "inside",
        dataPoints: this.state.dataForPie.slice(0,14).map((value, index) => {
          return {
            y: value,
            label: `Container ${index + 1}`
          }
        })
      }]
    }
    const barGraph = {
      title: {
        text: "Movements of Elements In Bar Graph"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.state.dataForPie[0], label: "Container 1" },
          { y: this.state.dataForPie[1], label: "Container 2" },
          { y: this.state.dataForPie[2], label: "Container 3" },
          { y: this.state.dataForPie[3], label: "Container 4" },
          { y: this.state.dataForPie[4], label: "Container 5" },
          { y: this.state.dataForPie[6], label: "Container 6" }
        ]
      }]
    }

    return (
        <div>
          <Container fluid>
            <Row>
              <Col >
                <div className={"buttonBorder"}>
                  <button onClick={this.resetLayout} style={{ width: "200px", height: "50px" }}>Reset Layout</button>
                  <button onClick={this.createProject} style={{ width: "200px", height: "50px" }}> Add Element</button>
                  <button onClick={this.deleteProject} style={{ width: "200px", height: "50px" }}> Delete Element</button>
                </div>
              </Col>
            </Row>
            <Row>

              <Col lg={9}>
                <ReactGridLayout
                    {...this.props}
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    onDragStop={(a, b) => this.dataForPieChart(b.i)}
                >
                  <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }} >
                    <img src={logo} alt="Logo" />
                  </div>
                  <div key="2" data-grid={{ w: 2, h: 4, x: 0, y: 3 }} >
                    <Tabs>
                      <TabList>
                        <Tab>Title 1</Tab>
                        <Tab>Title 2</Tab>
                      </TabList>

                      <TabPanel>
                        <h2>
                          {this.state.tabText}
                        </h2>
                      </TabPanel>
                      <TabPanel>
                        <h2>
                          {this.state.tabText}
                        </h2>
                      </TabPanel>
                    </Tabs>
                    <button onClick={this.editText}>Click</button>
                  </div>
                  <div key="3" data-grid={{ w: 2, h: 3, x: 0, y: 7 }} >
                    <img src={image1} alt="Logo" />
                  </div>
                  <div key="15" data-grid={{ w: 2, h: 3, x: 0, y: 7 }}>
                    <div className={"frameBox"}>
                      <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                              width="450px"
                              height="450px"
                              id="myId"
                              className="myClassname"
                              display="initial"
                              position="relative"/>
                    </div>
                  </div>

                  <div key="4" data-grid={{ w: 4, h: 10.25, x: 6, y: 0 }} >
                    <CanvasJSChart options={barGraph}
                        /* onRef={ref => this.chart = ref} */
                    />
                  </div>
                  <div key="6" data-grid={{ w: 2, h: 3, x: 6, y: 0 }} >
                    <input key="1000" value={this.state.inputValue} />
                    <button onClick={this.updateInputValue} >Submit</button>
                  </div>
                  <div key="7" data-grid={{ w: 2, h: 3, x: 6, y: 0 }} >
                    <button onClick={this.editText}>Click</button>
                  </div>
                  <div key="8" data-grid={{ h: 2, w: 3, x: 5, y: 0 }} >
                    <ButtonComp />
                  </div>
                  <div key="9" data-grid={{ x: 5, y: 0, w: 3, h: 11 }}>
                    <Card name="Allen Max" src={Image} work="Web Developer" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam." blogtime="3 days ago" />
                  </div>
                  <div key="10" data-grid={{ x: 5, y: 0, w: 3, h: 11 }}>
                    <Card name="Brendon Meculllum" src={Image1} work="Graphic Designer" content="Hey! I am a graphic designer. Checkout my blog." blogtime="4 days ago" />
                  </div>
                  <div key="11" data-grid={{ x: 4, y: 0, w: 2.8, h: 5.3 }}>
                    <Table />
                  </div>
                  <div key="12" style={{ i: 'g', x: 5, y: 0, w: 5, h: 12.07 }}>
                    <NormalImg />
                  </div>
                  <div key="13" data-grid={{ w: 10, h: 6, x: 6, y: 0 }} >
                    <div className={"clock"}>
                      <FlipClock
                          type="clock"
                      />
                    </div>
                  </div>
                  <div key="14" data-grid={{ w: 10, h: 6, x: 6, y: 0 }} >
                    <button onClick={this.createURL}>Add URL</button>
                    {urls}
                  </div>
                  {children}
                </ReactGridLayout>
              </Col>
              <Col lg={3}>
                <div key="5" data-grid={{ w: 4, h: 10.25, x: 8, y: 0 }} >
                  <CanvasJSChart options={options}
                      /* onRef={ref => this.chart = ref} */
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

function getFromLS(val, key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(val)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(val, key, value) {
  console.log(key, value);
  if (global.localStorage) {
    global.localStorage.setItem(
        val,
        JSON.stringify({
          [key]: value
        })
    );
  }
}