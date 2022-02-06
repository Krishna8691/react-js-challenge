import { useEffect } from "react";

const TableRow = ({ classname, date, name, status }) => {
  return (
    <tr className={classname}>
      <td>{name}</td>
      <td>{date}</td>
      <td>{status}</td>
    </tr>
  );
};

export default function StyledTable({ data, currentDate, dispatch }) {
  useEffect(() => {
    dispatch({ type: "UPDATE_VACCINATED_COUNT" });
  }, [currentDate]);

  const renderTableRows = () => {
    return data.map((person, index) => {
      const { person_name, vaccination_date, person_id } = person;
      const classname =
        new Date(vaccination_date) > new Date(currentDate)
          ? "pending"
          : "vaccinated";
      const vaccinationStatus =
        classname === "pending" ? "Vaccine Pending" : "Vaccine Done";
      return (
        <TableRow
          key={person_id}
          classname={classname}
          date={vaccination_date}
          name={person_name}
          status={vaccinationStatus}
        />
      );
    });
  };
  return (
    <table>
      <thead>
        <tr style={{ backgroundColor: "#737373", color: "white" }}>
          <th>Name</th>
          <th>Vaccination Date</th>
          <th>Vaccination Status</th>
        </tr>
      </thead>
      <tbody className="person-info">{renderTableRows()}</tbody>
    </table>
  );
}
