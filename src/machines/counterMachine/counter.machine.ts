import { assign, createMachine } from 'xstate';
import { ICounterContext } from './counter.types';

const initialContext: ICounterContext = {
  counter: 0
}
export const counterMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwDoBJTAQ2WwEsA3MAYgEEBhAFSIDUGWBRAbQAYAuolAAHVLEpVUmESAAeiAEz9+BAJwBWJQGZ1WgGwBGE+oMAaEAE9EOg+oIAWbY-7ajAdn4AOTR80AvgGWaFi4hAwUNPQAItzMbJw8AsJIIOKS0rJpiggqalq6+prGphbWtkYO6vyOHt6OjgaOnupBIRg4+ASRVLR0RAByTABK3ACy3IMsKXIZUpQycrk63gYE3kaamvwGtUb8Op4eljZ5HkYEHqsmSkrqviae7SChXRFR-XGjE1MzQnMJAsljlbJpLppCh4WgZHnVTohPOsdqp+PovN5vHpAsFXp1wj1PvQxgBlbj-VJiIFZZa2aEEAx2dRHbwqPaOJQIhCbAhKYw1DzNHRKErXIK4zCoCBwORvcKAzKLbKgXIAWnKZ3VLzl3RI5D6YAVwOVCkQgo0tUFHOuTTsXLslz0SkxaK8Ohu2vx3V60SNNNBCFcanuRns6iqfJ00M09ouGkFSiMTT5RlWdk9YW63DweFQeD9Stpgc5FTyJQIqbRBg8+WrwvFASAA */
  id: 'counter',
  initial: 'Inactive',
  context: initialContext,
  states: {
    Inactive: {
      on: {
        'ACTIVATE': 'Active'
      },
    },
    Active: {
      on: {
        'Error': 'Error',
        'DEACTIVATE': 'Inactive',
        'INCREMENT': {
          actions: assign({
            counter: ({context}) => context.counter + 1
          })
        },
        'DECREMENT': {
          guard: ({ context }) => context.counter > 0,
          actions: assign({
            counter: ({context}) => context.counter - 1
          })
        },
        'RESET': {
          guard: ({ context }) => context.counter > 0,
          actions:
            assign({
              counter: () => 0
            }),
        }
      },
    },
    Error: {
      entry:() => console.log('error')
    }
  },
});