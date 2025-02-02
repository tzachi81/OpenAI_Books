import classes from "./Counter.module.scss";

interface ICounterProps {
  stateCounter: any;
  sendToCounter: any;
  stateSystem: any;
}

export const Counter: React.FC<ICounterProps> = ({
  stateCounter,
  sendToCounter
}) => {


  const handleCounterActions = (action: string) => {
    sendToCounter({type: action});
  };

  return (
    <>
      <div className="card">
        <p>Counter: {stateCounter.context.counter}</p>
        <div className={classes.actionButtons}>
          <button onClick={() => handleCounterActions("INCREMENT")}>
            + 1
          </button>
          <button
            disabled={stateCounter.context.counter === 0}
            onClick={() => handleCounterActions("RESET")}
          >
            Reset
          </button>
          <button
            disabled={stateCounter.context.counter === 0}
            onClick={() => handleCounterActions("DECREMENT")}
          >
            - 1
          </button>
        </div>
      </div>
    </>
  );
};
