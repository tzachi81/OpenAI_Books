import classes from "./Filter.module.scss";

interface IFilterProps {
  category: string;
  filterItems: string[];
  booksState: any;
  sendToBooks: any;
}

export const Filter: React.FC<IFilterProps> = ({
  category,
  filterItems,
  booksState,
  sendToBooks,
}) => {
  const onSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const category = event.target.name;

    sendToBooks({
      type: "UPDATE_FILTERS",
      payload: { [name]: value },
    });
  };

  return (
    <div className={classes.filterWrapper}>
      <label>{category}</label>
      <select name={category} key={category} onChange={onSelected}>
        {filterItems.map((listItem) => {
          return <option key={listItem}>{listItem}</option>;
        })}
      </select>
    </div>
  );
};
