import { createActor } from 'xstate';
import { booksMachine } from './books.machine';



// Create an actor that you can send events to.
// Note: the actor is not started yet!
const actor = createActor(booksMachine);

// Start the actor
actor.start();

// actor.send({ type: 'fetchBooks', payload: getBooks })
// actor.send({ type: 'FETCH', payload: getBooks })

// Subscribe to snapshots (emitted state changes) from the actor
actor.subscribe((snapshot) => {
  console.log('Counter State:', snapshot.value);
});