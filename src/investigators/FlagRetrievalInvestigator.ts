import { FlagRetrievalState } from "../states/FlagRetrievalState";

/**
 * Investigates flag retrieval conditions
 *
 * @remarks {
 *   Determines when flag content should be retrieved from API
 * }
 *
 * @example {
 *   if (FlagRetrievalInvestigator.shouldRetrieveFlag(state)) {
 *     retrieveFlag();
 *   }
 * }
 *
 * @testScenario {
 *   Given: State has no flag content
 *   And: No retrieval error exists
 *   When: Condition is checked
 *   Then: Returns true
 *
 *   Given: State has flag content
 *   Or: Retrieval error exists
 *   When: Condition is checked
 *   Then: Returns false
 * }
 */
export class FlagRetrievalInvestigator {
  /**
   * Determines if flag should be retrieved
   *
   * @remarks {
   *   Checks both content and error conditions
   * }
   *
   * @param state - Current retrieval state
   * @returns {boolean} Whether flag should be retrieved
   */
  public static shouldRetrieveFlag(state: FlagRetrievalState): boolean {
    return state.retrievedFlagContent === null && !state.retrievalError;
  }
}
