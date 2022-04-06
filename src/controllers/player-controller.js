import { BatchedSubject } from "../core/batched-subject";

/**
 * Represents a player state
 */
export class PlayerController {
  /**
   * Max duration will be one minute
   */
  static MAX_DURATION = 60;

  /**
   * Returns a boolean specifying if the player is currently playing
   */
  isPlaying$ = new BatchedSubject(false);

  /**
   * Returns a boolean specifiying if the player is paused
   */
  isPaused$ = new BatchedSubject(false);

  /**
   * Current time of the player
   */
  timer$ = new BatchedSubject(0);

  /**
   * Should containt the id to clear interval
   * @private
   * @type {number | null | undefined}
   */
  _intervalId;

  get maxDuration() {
    return PlayerController.MAX_DURATION;
  }

  /**
   * Resets internal interval for player
   * @private
   */
  _resetInterval() {
    if (!this._intervalId) return;
    clearInterval(this._intervalId);
    this._intervalId = null;
  }

  /**
   * Starts the timer on the player
   */
  play() {
    if (this.isPlaying$.getValue()) return;

    this.isPlaying$.next(true);
    this.isPaused$.next(false);

    this._intervalId = setInterval(() => {
      const currentvalue = this.timer$.getValue();

      if (currentvalue >= PlayerController.MAX_DURATION) {
        this.pause();
        return;
      }

      this.timer$.next(this.timer$.getValue() + 1);
    }, 1000);
  }

  /**
   * Stops the player
   */
  stop() {
    this._resetInterval();
    this.isPaused$.next(true);
    this.isPlaying$.next(false);
    this.timer$.next(0);
  }

  /**
   * Pauses the player
   */
  pause() {
    this._resetInterval();
    this.isPaused$.next(true);
    this.isPlaying$.next(false);
  }

  setTime(time) {
    if (time < 0 || time > PlayerController.MAX_DURATION) return;

    this._resetInterval();
    this.isPlaying$.next(false);
    this.isPaused$.next(true);
    this.timer$.next(time);
  }
}
