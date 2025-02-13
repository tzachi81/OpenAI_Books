import { upperCaseFirstLetter } from "../filterUtils.ts/filterUtils";
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
      payload: name === "None" ? {category: '', value: ''} : { category: name, value },
    });
  };

  return (
    <div className={classes.filterWrapper}>
      <select name={genre} key={`genre_${genre}`} onChange={onSelected}>
      <option key={"none"} value="none">-- Select {upperCaseFirstLetter(genre)} --</option>
        {filterItems.map((listItem) => {
          return <option key={listItem}>{listItem}</option>;
        })}
      </select>
    </div>
  );
};
