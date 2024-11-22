import { FlagRetrievalState } from "../states/FlagRetrievalState";
import { FlagRetrievalInvestigator } from "../investigators/FlagRetrievalInvestigator";

/**
 * Error class for flag retrieval process
 *
 * @remarks {
 *   Provides assertion methods to validate flag retrieval operations
 * }
 *
 * @example {
 *   FlagRetrievalError.assertCanRetrieveFlag(state);
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
export class FlagRetrievalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FlagRetrievalError";
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
  public static assertCanRetrieveFlag(
    state: FlagRetrievalState
  ): asserts state is FlagRetrievalState {
    if (!FlagRetrievalInvestigator.shouldRetrieveFlag(state)) {
      throw new FlagRetrievalError(
        "Cannot retrieve flag: Previous retrieval completed or failed"
      );
    }
  }
}
