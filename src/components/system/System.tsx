import classes from "./System.module.scss";
import { StatusIndicator } from "./StatusIndicator/StatusIndicator";

interface ISystemProps {
  stateSystem: any,
  sendToSystem: any,
  sendToCounter: any
}

export const System: React.FC<ISystemProps> = ({sendToSystem, stateSystem, sendToCounter}) => {

  const toggleSystem = () => {
    const eventType = stateSystem.value === 'Active'? 'DEACTIVATE': 'ACTIVATE'
    sendToCounter({type: eventType});
    sendToSystem({ type:  eventType});

  }

  return (
    <>
      <div className={classes.system}>
      <StatusIndicator color={String(stateSystem.value) === 'Active'? 'green': 'red'}/>
      <p>System</p>
        <button onClick={toggleSystem}>{stateSystem.value === 'Active'? 'DEACTIVATE': 'ACTIVATE'}</button>
      </div>
    </>
  );
}
