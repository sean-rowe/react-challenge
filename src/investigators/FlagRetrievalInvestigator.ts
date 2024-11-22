// src/investigators/FlagRetrievalInvestigator.ts

import { FlagRetrievalState } from "../states/FlagRetrievalState";

/**
 * Interface for flag retrieval investigation operations
 *
 * @remarks {
 *   Defines contract for determining flag retrieval conditions
 * }
 */
export interface IFlagRetrievalInvestigator {
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
  shouldRetrieveFlag(state: FlagRetrievalState): boolean;
}

/**
 * Investigates flag retrieval conditions
 *
 * @remarks {
 *   Determines when flag content should be retrieved from API
 * }
 *
 * @example {
 *   const investigator = new FlagRetrievalInvestigator();
 *   if (investigator.shouldRetrieveFlag(state)) {
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
export class FlagRetrievalInvestigator implements IFlagRetrievalInvestigator {
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
  public shouldRetrieveFlag(state: FlagRetrievalState): boolean {
    return state.retrievedFlagContent === null && !state.retrievalError;
  }
}