import { ILogger, DefaultLogger } from '../Logger';
import BigNumber from 'bignumber.js';
import { TxStatus } from '../Enum';

export interface ICachedTxDetails {
  bounty: BigNumber;
  temporalUnit: number;
  claimedBy: string;
  wasCalled: boolean;
  windowStart: BigNumber;
  claimWindowStart: BigNumber;
  status: TxStatus;
}

export default class Cache<T> {
  public cache: {} = {};
  public logger: ILogger;

  constructor(logger: ILogger = new DefaultLogger()) {
    this.logger = logger;
  }

  public set(key: string, value: T) {
    this.cache[key] = value;
  }

  public get(key: string, fallback?: any): T {
    const value = this.cache[key];
    if (value === undefined) {
      if (fallback === undefined) {
        throw new Error('attempted to access key entry that does not exist: ' + key);
      }

      return fallback;
    }

    return value;
  }

  public has(key: string) {
    if (this.cache[key] === undefined) {
      return false;
    }
    return true;
  }

  public del(key: string) {
    delete this.cache[key];
  }

  public length(): number {
    return this.stored().length;
  }

  public stored() {
    return Object.keys(this.cache) || [];
  }

  public isEmpty() {
    return this.length() === 0;
  }
}
