// src/errors/FlagRetrievalError.ts

import { FlagRetrievalState } from "../states/FlagRetrievalState";
import {FlagRetrievalInvestigator, IFlagRetrievalInvestigator} from "../investigators/FlagRetrievalInvestigator";

/**
 * Interface for flag retrieval error operations
 *
 * @remarks {
 *   Defines contract for flag retrieval validation
 * }
 */
export interface IFlagRetrievalError {
  /**
   * Asserts flag can be retrieved
   *
   * @remarks {
   *   Validates state for flag retrieval
   * }
   *
   * @param state Current retrieval state
   * @throws {FlagRetrievalError} If flag cannot be retrieved
   */

  assertCanRetrieveFlag(
      state: FlagRetrievalState
  ): asserts state is FlagRetrievalState;
}
/**
 * Error class for flag retrieval process
 *
 * @remarks {
 *   Provides assertion methods to validate flag retrieval operations
 * }
 *
 * @example {
 *   const error = new FlagRetrievalError("Error message");
 *   error.assertCanRetrieveFlag(state);
 *   // Proceeds if valid, throws if invalid
 * }
 *
 * @testScenario {
 *   Given: State with existing content
 *   When: assertCanRetrieveFlag called
 *   Then: Throws error with message
 *
 *   Given: State with no content or error
 *   When: assertCanRetrieveFlag called
 *   Then: Does not throw error
 * }
 */
export class FlagRetrievalError extends Error implements IFlagRetrievalError {
  private readonly investigator: IFlagRetrievalInvestigator;

  constructor(message: string) {
    super(message);
    this.name = "FlagRetrievalError";
    this.investigator = new FlagRetrievalInvestigator();
  }

  /**
   * Asserts flag can be retrieved
   *
   * @remarks {
   *   Uses investigator to check retrieval conditions
   * }
   *
   * @param state Current retrieval state
   * @throws {FlagRetrievalError} If flag cannot be retrieved
   */
  public assertCanRetrieveFlag(state: FlagRetrievalState): asserts state is FlagRetrievalState {
    if (!this.investigator.shouldRetrieveFlag(state)) {
      throw new FlagRetrievalError(
          "Cannot retrieve flag: Previous retrieval completed or failed"
      );
    }
  }
}