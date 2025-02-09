import classes from './Pagination.module.scss';


interface IPagintationProps{
  sendToBooks: any,
  booksState: any
}

export const Pagination: React.FC<IPagintationProps> = ({booksState, sendToBooks}) => {

  const { books, page, itemsPerPage } = booksState.context;

  const handleNext = () => sendToBooks({type: 'NEXT'});
  const handlePrevious = () => sendToBooks({type: 'PREVIOUS'});
  const handleFirst = () => sendToBooks({type: 'FIRST'});
  const handleLast = () => sendToBooks({type: 'LAST'});

  return <div className={classes.pagination}>

    <button disabled={page === 1} onClick={handleFirst}>{'First'}</button>
    <button disabled={page > books.length / itemsPerPage - 1} onClick={handleNext}>{'Next'}</button>
    <p>{page}</p>
    <button disabled={page === 1} onClick={handlePrevious}>{'Previous'}</button>
    <button disabled={false} onClick={handleLast}>{'Last'}</button>
  </div>
}