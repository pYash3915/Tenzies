import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [diceData, setDiceData] = useState(() => generateAllNewDice());

  const gameWon =
    diceData.every((die) => die.isHeld) &&
    diceData.every((die) => die.value === diceData[0].value);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDiceData((prevData) =>
      prevData.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollTheDice() {
    if (!gameWon) {
      setDiceData((prevData) =>
        prevData.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDiceData(generateAllNewDice);
    }
  }

  const diceElement = diceData.map((num) => (
    <Die
      key={num.id}
      hold={() => hold(num.id)}
      isHeld={num.isHeld}
      value={num.value}
    />
  ));

  return (
    <main>
      {gameWon ? <Confetti /> : null}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <button className="roll-dice" onClick={rollTheDice}>
        {gameWon ? "New Game!" : "Roll"}
      </button>
    </main>
  );
}
