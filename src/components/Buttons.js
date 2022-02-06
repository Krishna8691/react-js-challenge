export default ({ currentDate, dispatch }) => {
  const date = new Date(currentDate);
  let payload;
  const changeDate = (type) => {
    if (type === "increament") {
      payload = new Date(date.setDate(date.getDate() + 1)).toDateString();
    }
    if (type === "decreament") {
      payload = new Date(date.setDate(date.getDate() - 1)).toDateString();
    }
    dispatch({ type: "INC_DEC_DATE", payload });
  };

  return (
    <>
      <button onClick={() => changeDate("increament")}>+</button>
      <p>{currentDate}</p>
      <button onClick={() => changeDate("decreament")}>-</button>
    </>
  );
};
