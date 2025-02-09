import classes from "./CategoryFilter.module.scss";

interface IFilterProps {
  genre: string;
  filterItems: string[];
  booksState: any;
  sendToBooks: any;
}

export const CategoryFilter
: React.FC<IFilterProps> = ({
  genre,
  filterItems,
  sendToBooks,
}) => {
  const onSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    sendToBooks({
      type: "UPDATE_FILTERS",
      payload: name === "None" ? {} : { [name]: value },
    });
  };

  return (
    <div className={classes.filterWrapper}>
      <select name={genre} key={`genre_${genre}`} onChange={onSelected}>
        {filterItems.map((listItem) => {
          return <option key={listItem}>{listItem}</option>;
        })}
      </select>
    </div>
  );
};
