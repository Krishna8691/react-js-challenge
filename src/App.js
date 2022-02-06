{/*
  PLEASE BEGIN THIS BY READING THE README.md FILE
*/}
import "./styles.css";
import PieChart from "./components/PieChart";
import StyledTable from "./components/Table";
import Buttons from "./components/Buttons";
import React from "react";

const reducer = (state, action) => {
  return state;
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    currentDate: new Date(),
    personInfo: []
  });

  return (
    <div className="App">
      <div className="chart">
        <PieChart data={[60, 40]} />
      </div>
      <div className="buttons">
        <Buttons />
      </div>
      <b style={{ textAlign: "center" }}>
        X out of Y persons have been vaccinated.
      </b>
      <div className="table">
        <StyledTable />
      </div>
    </div>
  );
}
