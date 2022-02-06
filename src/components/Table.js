export default function StyledTable() {
  return (
    <table>
      <thead>
        <tr style={{ backgroundColor: "#737373", color: "white" }}>
          <th>Name</th>
          <th>Vaccination Date</th>
          <th>Vaccination Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="vaccinated">
          <td>John Doe</td>
          <td>2021-05-03</td>
          <td>Vaccine Done</td>
        </tr>
        <tr className="pending">
          <td>Jane Doe</td>
          <td>2021-05-23</td>
          <td>Vaccine Pending</td>
        </tr>
      </tbody>
    </table>
  );
}
