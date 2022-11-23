import React from "react";
import Chart from "../chart/Chart";
import Featured from "../featured/Featured";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Widget from "../widget/Widget";
import "./dashboard.scss";
const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
