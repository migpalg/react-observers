import { Subject } from "rxjs";
import ReactDOM from "react-dom";

/**
 * Same as BehaviorSubjects but use ReactDOM API to propagate all events to
 * listeners with only one commit to the DOM
 */
export class BatchedSubject extends Subject {
  /**
   * @private
   */
  _value;

  constructor(value) {
    super(value);
    this._value = value;
  }

  /**
   * @protected
   * @internal
   */
  _subscribe(subscriber) {
    const subscription = super._subscribe(subscriber);
    !subscription.closed && subscriber.next(this._value);
    return subscription;
  }

  getValue() {
    const { hasError, thrownError, _value } = this;
    if (hasError) {
      throw thrownError;
    }
    this._throwIfClosed();
    return _value;
  }

  next(value) {
    ReactDOM.unstable_batchedUpdates(() => {
      super.next((this._value = value));
    });
  }
}
