import { createActor } from 'xstate';
import { counterMachine } from './counter.machine';

// Create an actor that you can send events to.
// Note: the actor is not started yet!

const actor = createActor(counterMachine);


// Start the actor
actor.start();

// Subscribe to snapshots (emitted state changes) from the actor
actor.subscribe((snapshot) => {
  console.log('Counter State:', snapshot.value);
});