import {
  IBook,
  IBooksEvents,
  TBooksEvents,
} from "../../machines/booksMachine/books.types";
import classes from "./Pagination.module.scss";

interface IPagintationProps {
  sendToBooks: (event: IBooksEvents) => void;
  booksState: any;
  collection: IBook[];
}

export const Pagination: React.FC<IPagintationProps> = ({
  booksState,
  sendToBooks,
  collection,
}) => {
  const { page, itemsPerPage } = booksState.context;

  const pageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const action = event.currentTarget.innerHTML.toUpperCase();
    sendToBooks({ type: action as keyof TBooksEvents });
  };

  return (
    <div className={classes.pagination}>
      <button disabled={page === 1} onClick={(e) => pageHandler(e)}>
        {"First"}
      </button>
      <button disabled={page === 1} onClick={(e) => pageHandler(e)}>
        {"Previous"}
      </button>
      <p>{page}</p>
      <button
        disabled={page >= Math.ceil(collection.length / itemsPerPage)}
        onClick={(e) => pageHandler(e)}
      >
        {"Next"}
      </button>
      <button
        disabled={page === Math.ceil(collection.length / itemsPerPage)}
        onClick={(e) => pageHandler(e)}
      >
        {"Last"}
      </button>
    </div>
  );
};
