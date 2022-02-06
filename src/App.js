import "./styles.css";
import PieChart from "./components/PieChart";
import StyledTable from "./components/Table";
import Buttons from "./components/Buttons";
import React, { useContext, useEffect, useMemo } from "react";
import axios from "axios";
import produce from "immer";
import { AppContextProvider, Context } from "./Context";

const initialState = {
  currentDate: "",
  status: "idle",
  personInfo: [],
  personsVaccinated: 0,
  err: null,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "DATA_FETCH_STARTED":
      draft.status = "inprogress";
      break;
    case "DATA_FETCH_SUCCESS":
      draft.status = "success";
      const {
        payload: { currentDate, vaccineDates },
      } = action;
      draft.currentDate = new Date(currentDate).toDateString();
      draft.personInfo = vaccineDates;
      break;
    case "DATA_FETCH_FAILED":
      draft.status = "idle";
      draft.err = action.payload;
      break;
    case "INC_DEC_DATE":
      draft.currentDate = action.payload;
      break;
    case "UPDATE_VACCINATED_COUNT":
      draft.personsVaccinated = document.querySelectorAll(
        ".person-info .vaccinated"
      ).length;
      break;
    default:
      break;
  }
});

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(async () => {
    try {
      dispatch({ type: "DATA_FETCH_STARTED" });
      const currentDate = await axios.get("../data/current_date.json");
      const vaccineDates = await axios.get("../data/vaccine_dates.json");
      dispatch({
        type: "DATA_FETCH_SUCCESS",
        payload: {
          currentDate: currentDate.data.current_date,
          vaccineDates: vaccineDates.data,
        },
      });
    } catch (err) {
      dispatch({
        type: "DATA_FETCH_FAILED",
        payload: err,
      });
    }
  }, []);

  const renderButtons = () => {
    return useMemo(
      () => <Buttons dispatch={dispatch} currentDate={state.currentDate} />,
      [state.currentDate]
    );
  };

  const renderPieChart = () => {
    return useMemo(() => {
      if (state.status === "inprogress") {
        return (
          <div className="pie-chart-container">
            <h2>Loading ...</h2>
          </div>
        );
      }
      const { personsVaccinated, personInfo } = state;
      return (
        <AppContextProvider>
          <PieChart
            vaccinated={personsVaccinated}
            notVaccinated={personInfo.length - personsVaccinated}
          />
        </AppContextProvider>
      );
    }, [state.personsVaccinated]);
  };

  return (
    <div className="App">
      <div className="pie-chart-container">
        <div className="chart">{renderPieChart()}</div>
        <div className="buttons">{renderButtons()}</div>
      </div>
      <b style={{ textAlign: "center" }}>
        {state.personsVaccinated} out of {state.personInfo.length} persons have
        been vaccinated.
      </b>
      <div className="table">
        <StyledTable
          dispatch={dispatch}
          currentDate={state.currentDate}
          data={state.personInfo}
        />
      </div>
    </div>
  );
}
