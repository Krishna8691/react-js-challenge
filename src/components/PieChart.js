import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { AppContextProvider, Context } from "../Context";

const PieChart = ({ vaccinated, notVaccinated }) => {
  const colors = useContext(Context);
  const options = {
    labels: ["Vaccinated", "Not Vaccinated"],
    datasets: [
      {
        label: "My First Dataset",
        data: [vaccinated, notVaccinated],
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
    height: "50%",
  };
  return <Pie data={options} />;
};

export default PieChart;
