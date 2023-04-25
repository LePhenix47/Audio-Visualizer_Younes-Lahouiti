/**
 * Utility class that sets and clears intervals
 */
export class Interval {
  private id: NodeJS.Timer;
  private arrayOfIds: NodeJS.Timer[] = [];

  constructor() {}

  /**
   * Method that creates an interval
   *
   * @param {(...args: any) => any | void} callback Callback function that will be called after the timer runs out
   * @param milliseconds Duration of the timer in milliseconds before executing the callback function
   * @returns A number as an ID for the interval
   *
   * @example
   * let fct = () => {
   *   console.log("Hello World");
   * };
   *
   * let intervalTrigger = Interval.set(fct, 2_500);
   *
   */
  set(
    callback: (...args: any) => any | void,
    milliseconds: number
  ): NodeJS.Timer {
    this.id = setInterval(() => {
      callback();
    }, milliseconds);

    this.arrayOfIds.push(this.id);

    return this.id;
  }

  /**
   * Method that clears an interval
   *
   * @param {number} id ID of the interval to clear (stored inside the trigger of the interval)
   *
   * @example
   *
   * function fct() {
   *   console.log("Hello world!");
   * }
   *
   *
   * let intervalTrigger = Interval.set(fct, 2_500);
   *
   * // ...
   *
   * Interval.clear(intervalTrigger);
   *
   */
  clear(id: NodeJS.Timer): void {
    const actualId: NodeJS.Timer = this.arrayOfIds.filter(
      (idNumber: NodeJS.Timer) => {
        return idNumber === id;
      }
    )[0];

    clearInterval(actualId);

    this.arrayOfIds = this.arrayOfIds.filter((idNumber: NodeJS.Timer) => {
      return idNumber !== actualId;
    });
  }
}
