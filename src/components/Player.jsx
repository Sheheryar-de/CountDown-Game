import { useState, useRef } from "react";

export default function Player() {
  //   const [submitted, setSubmitted] = useState(false);
  //   const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  //   const handleChange = (event) => {
  //     setSubmitted(false);
  //     setEnteredPlayerName(event.target.value);
  //   };

  //   const handleClick = () => {
  //     setSubmitted(true);
  //   };

  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  const handleClick = () => {
    //with this function it takes input directly from <input/> tag and set it to the function for that we dont need handleChange function or submitted state
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  };

  return (
    <section id="player">
      {/* down here if enteredPlayerName is truthy it shows its value otherwise text */}
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input
          type="text"
          ref={playerName} //it now connect with the useRef state
          //   value={enteredPlayerName}
          //   onChange={handleChange}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
