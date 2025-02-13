import classes from "./BookItem.module.scss";
import genreIcon from '../assets/images/genre-icon.png';
import bookIcon from '../assets/images/book-icon.png';
import { IBook } from "../../../machines/booksMachine/books.types";

interface IBooksProps {
  book: IBook;
}

export const BookItem: React.FC<IBooksProps> = ({ book }) => {
  const { author, description, genre, publication_year, title } =
    book;


  return (
    <li className={classes.bookItem} key={book.id}>
      <img
        src={'https://placehold.co/50x80'}
        alt={`${title} cover`}
      />
      <div className={classes.details}>
        <h3>{`${title}, ${author} (${publication_year})`}</h3>
        <span><img src={genreIcon}></img>{genre.join(', ')}</span>
        <span><img src={bookIcon}></img>{description}</span>
      </div>
    </li>
  );
};
