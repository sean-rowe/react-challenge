// src/states/FlagRetrievalState.ts

/**
 * Represents state of flag content retrieval process
 *
 * @remarks {
 *   Immutable state containing either:
 *   - Retrieved flag content
 *   - Retrieval error
 *   - Neither (initial state)
 * }
 *
 * @example {
 *   const state = new FlagRetrievalState({
 *     retrievedFlagContent: null,
 *     retrievalError: null
 *   });
 * }
 *
 * @testScenario {
 *   Given: Content provided
 *   When: State constructed
 *   Then: Content accessible
 *   And: State immutable
 *
 *   Given: Error provided
 *   When: State constructed
 *   Then: Error accessible
 *   And: State immutable
 * }
 */
export interface IFlagRetrievalState {
  readonly retrievedFlagContent: string | null;
  readonly retrievalError: string | null;
}

export class FlagRetrievalState implements IFlagRetrievalState {
  private readonly _retrievedFlagContent: string | null;
  private readonly _retrievalError: string | null;

  constructor(state: IFlagRetrievalState) {
    this._retrievedFlagContent = state.retrievedFlagContent;
    this._retrievalError = state.retrievalError;
    Object.freeze(this);
  }

  /**
   * Retrieves the content of the flag.
   *
   * @return {string | null} The content of the flag, or null if not set.
   */
  get retrievedFlagContent(): string | null {
    return this._retrievedFlagContent;
  }

  /**
   * Retrieves the current retrieval error message, if any.
   *
   * @return {string | null} The error message that occurred during retrieval, or null if there was no error.
   */
  get retrievalError(): string | null {
    return this._retrievalError;
  }
}