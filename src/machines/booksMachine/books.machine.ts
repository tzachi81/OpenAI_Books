import { assign, createMachine, fromPromise } from "xstate";
import { IBooksContext } from "./books.types";
// import books from '../../assets/booksData/books.json'

const initialContext: IBooksContext = {
  books: [],
  page: 1,
  itemsPerPage: 5,
  filters: { category: '', value: ''},
  error: '',
  loading: false
}

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = '/booksData/books.json';

const fetchBooks = async () => {
  // const response = await fetch('/api');
  const response = await fetch(`${apiUrl}`);
  if (!response.ok) {
    throw new Error('Error fetching books');
  }

  const data = await response.json();

  return data;
};

export const booksMachine = createMachine({
  id: 'books',
  context: initialContext,
  initial: 'Idle',
  states: {
    Idle: {
      on: {
        FETCH: 'Loading'
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
      on: {
        FETCH: 'Loading',
        UPDATE_FILTERS: {
          actions: assign({
            filters: ({ event }) => ({ ...event.payload })
            // filters: ({ context, event }) => ({ ...context.filters, ...event.payload })
          }),
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
            page: ({ context }) => context.books.length / context.itemsPerPage
          })
        },

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