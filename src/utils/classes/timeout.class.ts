/**
 * Utility class that sets and clears timeouts
 *
 * @class
 */
export class Timeout {
  private id: NodeJS.Timeout;
  private arrayOfIds: NodeJS.Timeout[] = [];

  constructor() {}

  /**
   * Method that creates an timeout
   *
   * @param {(...args: any) => any | void} callback Callback function that will be called after the timeout runs out
   * @param milliseconds Duration of the timeout in milliseconds before executing the callback function
   * @returns A number as an ID for the timeout
   *
   * @example
   * let fct = () => {
   *   console.log("Hello World");
   * };
   *
   * const timeout = new Timeout()
   *
   * let timeoutTrigger = new Timeout().add(fct, 2_500);
   *
   */
  public set(
    callback: (...args: any) => any | void,
    milliseconds: number
  ): NodeJS.Timeout {
    this.id = setTimeout(() => {
      callback();
    }, milliseconds);

    this.arrayOfIds.push(this.id);

    return this.id;
  }

  /**
   * Method that clears a timeout
   *
   * @param {number} id ID of the timeout to clear (stored inside the trigger of the timeout)
   *
   * @example
   *
   * function fct() {
   *   console.log("Hello world!");
   * }
   *
   * const timeout = new Timeout()
   * let timeoutTrigger = timeout.add(fct, 2_500);
   *
   * // ...
   *
   * timeout.clear(timeoutTrigger);
   *
   */
  public clear(id: NodeJS.Timeout): void {
    const actualId: NodeJS.Timeout = this.arrayOfIds.filter(
      (idNumber: NodeJS.Timeout) => {
        return idNumber === id;
      }
    )[0];

    clearTimeout(actualId);

    this.arrayOfIds = this.arrayOfIds.filter((idNumber: NodeJS.Timeout) => {
      return idNumber !== actualId;
    });
  }
}
