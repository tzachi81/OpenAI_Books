import { assign, createMachine, fromPromise } from "xstate";
import { IBook, IBooksContext, IBooksEvents, IFilter } from "./books.types";
import { getBooksCollection } from "../../openAi/openAi";


const initialContext: IBooksContext = {
  books: [],
  filtered: [],
  page: 1,
  itemsPerPage: 5,
  filters: { category: '', value: '' },
  error: '',
  loading: false
}


const fetchBooks = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await getBooksCollection();
      resolve(response);
    } catch (error) {
      console.error('Error fetching books:', error);
      reject(error);
    }
  });
};

const filterItems = (books: IBook[], filter: IFilter) => {

  return books.filter(
    (book: IBook) => {
      const { category, value } = filter;
      const structure = book[category as keyof IBook];
      return !Array.isArray(structure) ? structure === value : structure.includes(value)
    }
  )
}

export const booksMachine = createMachine({
  id: 'books',
  schemas: {
    events: {} as IBooksEvents,
    context: {} as IBooksContext
  },
  context: initialContext,
  initial: 'Idle',
  states: {
    Idle: {
      on: {
        FETCH: 'Loading',
        DEACTIVATE: {
          actions: assign({
            ...initialContext
          })
        }
      }
    },
    Loading: {
      entry: assign({
        loading: () => true
      }),
      invoke: {
        id: 'fetchBooks',
        src: fromPromise(fetchBooks),
        onDone: {
          actions: [
            assign({
              loading: () => false,
              books: ({ event }) => event.output,
            })
          ],
          target: 'Success',
        },
        onError: {
          target: 'Failure',
          actions: assign({
            loading: () => false,
            error: ({ event }) => (event.error as Error).message
          })
        }
      },

    },
    Success: {
      target: 'Idle',
      on: {
        UPDATE_FILTERS: {
          actions: [
            assign({
              page: 1,
              filters: ({ event }) => ({ ...event.payload }),
            }),
            assign({
              filtered: ({ context }) => {
                const { books, filters } = context;
                return (filters.category !== '') ? filterItems(books, filters) : [];
              },
            })
          ],
        },
        FIRST: {
          actions: assign({
            page: () => 1
          })
        },
        NEXT: {
          actions: assign({
            page: ({ context }) => context.page + 1
          })
        },
        PREVIOUS: {
          actions: assign({
            page: ({ context }) => context.page - 1
          })
        },
        LAST: {
          actions: assign({
            page: ({ context }) => {
              const { filtered, books } = context;
              const collection: IBook[] = filtered.length > 0 ? filtered : books
              return Math.ceil(collection.length / context.itemsPerPage)
            }
          })
        }
      }
    },
    Failure: {
      after: {
        3000: {
          target: 'Idle',
          actions: assign({ error: () => '' })
        }
      },
    }
  }
});