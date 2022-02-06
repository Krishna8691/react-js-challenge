import { useState } from "react";

export default function () {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <>
      <button>+</button>
      <p> {new Date().toDateString()} </p>
      <button>-</button>
    </>
  );
}
