import { CategoryFilter } from "./filter/CategoryFilter";
import classes from "./Filters.module.scss";

import React, { useEffect, useMemo, useState } from "react";

interface IFiltersProps {
  booksState: any;
  sendToBooks: any;
}
interface IValidCategories {
  [key: string]: string[];
}

export const Filters: React.FC<IFiltersProps> = (props) => {
  const { booksState, sendToBooks } = props;
  const { books, filters } = booksState.context;
  const [selectedCategory, setSelectedCategory] = useState<string>("none");

  const updatedSelectedCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const upperCaseFirstLetter = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);
  
  const updatedCategories: IValidCategories = useMemo(() => {
    const validCategories: IValidCategories = {
      title: [],
      author: [],
      publication_year: [],
      genre: [],
    };


    if (books.length > 0) {
      const validCategoriesKeys = Object.keys(validCategories);

      validCategoriesKeys.forEach((validCategory) => {
        books.forEach((book: any) => {
          const categoryItem = book[validCategory];

          const pushValidItem = (item: string) => {
            if (!validCategories[validCategory].includes(item)) {
              validCategories[validCategory].push(item);
            }
          };

          if (Array.isArray(categoryItem)) {
            categoryItem.forEach((item) => {
              pushValidItem(item);
            });
          } else {
            pushValidItem(categoryItem);
          }
        });
      });
    }
    return validCategories;
  }, [books]);

  return (
    <>
      <div className={classes.filters}>
        <select value={selectedCategory} onChange={updatedSelectedCategory}>
          <option key={"none"} value="none">
            Filter by
          </option>
          {Object.keys(updatedCategories).map((category) => (
            <option key={category} value={category}>
              {upperCaseFirstLetter(category)}
            </option>
          ))}
        </select>
        {selectedCategory !== "none" && (
          <CategoryFilter
            key={`genre_${selectedCategory}`}
            genre={selectedCategory}
            filterItems={updatedCategories[selectedCategory].sort()}
            booksState={booksState}
            sendToBooks={sendToBooks}
          />
        )}
      </div>
    </>
  );
};
