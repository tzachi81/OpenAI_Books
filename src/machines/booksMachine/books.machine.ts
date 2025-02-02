import { assign, createMachine, fromPromise } from "xstate";
import { IBook, IBooksContext } from "./books.types";
import { Books } from "../../components/books/Books";

const initialContext: IBooksContext = {
  books: [],
  filters: {},
  error: '',
  loading: false
}

const fetchBooks = async () => {
  const response = await fetch('/api');
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
          filters: ({ context, event }) => ({...context.filters, ...event.payload})
        }),
      }
    }
  },
    Failure: {
      on: {
        FETCH: {
          target: 'Idle',
        }
      }
    }
  }
});