import { createMachine, sendTo, assign, spawnChild, stopChild } from 'xstate';
import { IToggleContext } from './system.types';
import { counterMachine } from '../counterMachine/counter.machine';
import { booksMachine } from '../booksMachine/books.machine';
// import { IInput, IToggleContext } from './toggle.types';

const initialContext: IToggleContext = {
}

export const systemMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwJ6wC5gLYDoCSAdgIYDG6AlgG5gDEAggMIAqeAanUwKIDaADALqJQABwD2schVEEhIAB6IAjADYAzDgCcWjQA5dygOyKDJgDQgUiAEwb1AFl46DvAKwreRlxpcBfH+dQMbBw6MipaABFORhZ2Lj5BJBAxCSkZJIUEFysDHAMrZStVAo1FHMUNc0sEAFodRRw1Xm87RRdsrztfP3MCUQg4WUDMLFkUyXJpWUya5SrEGpUdHD0rHWVjXTcNnR6QYeDCUgpqMfEJqYzEOyt5hEVWnAflHVVFdYMdJ1VVPYPcUInMBnVKTdKgTI2ZR5B6qXh2DT5ZS6W4WJTFFbNbI6KxdVRaAzdPxAA */
  id: 'system',
  schemas: {
    context: {} as IToggleContext,
  },
  initial: 'Inactive',
  context: initialContext,
  states: {
    Inactive: {
      on: {
        'ACTIVATE': {
          actions: [
            spawnChild(counterMachine, {id: 'counter'}),
            spawnChild(booksMachine, {id: 'books'}),
          ],
          target: 'Active',
        },
      },
    },
    Active: {
      on: {
        'DEACTIVATE': {
          actions: [
            stopChild('counter')
          ],
          target: 'Inactive',
        },
      },
    },
    // Error: {
    //   entry: () => console.log('error')
    // }
  },
});