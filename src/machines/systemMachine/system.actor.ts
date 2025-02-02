import { createActor } from 'xstate';
import { systemMachine } from './system.machine';
import { createBrowserInspector } from '@statelyai/inspect';

// Create an actor that you can send events to.
// Note: the actor is not started yet!
const { inspect } = createBrowserInspector();
const actor = createActor(systemMachine, {inspect});


// Start the actor
actor.start(); // logs 'Inactive'

// Subscribe to snapshots (emitted state changes) from the actor
export const toggleSubscriber = actor.subscribe((snapshot) => {
  console.log('System State:', snapshot.value);
});