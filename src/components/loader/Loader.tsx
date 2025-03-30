import classes from "./Loader.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.bars}></div>
      <p>Getting books using openAI, This might take a while...</p>
    </div>
  );
};
