export interface ICounterContext {
    counter: number
}

export type ICounterEvent = 'INCREMENT' | 'DECREMENT' | 'RESET' | 'DEACTIVATE' | 'ACTIVATE';

export interface ICounterEvents {
  type: ICounterEvent
}
