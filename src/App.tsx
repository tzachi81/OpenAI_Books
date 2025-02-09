import "./App.css";

import { useEffect } from "react";
import { System } from "./components/system/System";
import { useMachine } from "@xstate/react";
import { systemMachine } from "./machines/systemMachine/system.machine";
import { counterMachine } from "./machines/counterMachine/counter.machine";
import { booksMachine } from "./machines/booksMachine/books.machine";
import { Books } from "./components/books/Books";

function App() {
  const [stateSystem, sendToSystem] = useMachine(systemMachine);
  const [stateCounter, sendToCounter] = useMachine(counterMachine);
  const [booksState, sendToBooks] = useMachine(booksMachine);

  useEffect(() => {
    if (stateSystem.value === "Active") {
      sendToCounter({ type: "ACTIVATE" });
    }
  }, [stateCounter, stateSystem, sendToSystem]);


  return (
    <>
      <System
        sendToCounter={sendToCounter}
        stateSystem={stateSystem}
        sendToSystem={sendToSystem}
      />
      {stateSystem.value === "Active" && (
        <>
          {/* <Counter
            stateSystem={stateSystem}
            stateCounter={stateCounter}
            sendToCounter={sendToCounter}
          /> */}
          
          <Books booksState={booksState} sendToBooks={sendToBooks}/>
        </>
      )}
    </>
  );
}

export default App;
