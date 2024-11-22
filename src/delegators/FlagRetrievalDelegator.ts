import { FlagRetrievalInvestigator } from "../investigators/FlagRetrievalInvestigator";
import { BaseDelegator } from "../patterns/BasePatterns";
import { FlagRetrievalState } from "../states/FlagRetrievalState";
import { FlagRetrievalWorker } from "../workers/FlagRetrievalWorker";

/**
 * Delegator coordinating flag retrieval process
 *
 * @remarks {
 *   Coordinates between investigator and worker for flag retrieval
 *   Implements BaseDelegator for flag retrieval state processing
 * }
 *
 * @example {
 *   const delegator = new FlagRetrievalDelegator();
 *   const newState = await delegator.process(currentState);
 * }
 *
 * @testScenario {
 *   Given: Clean state exists
 *   When: process called
 *   And: investigator approves retrieval
 *   Then: worker retrieves flag
 *   And: Returns new state with content
 *
 *   Given: State with error exists
 *   When: process called
 *   And: investigator denies retrieval
 *   Then: Returns unchanged state
 * }
 */
export class FlagRetrievalDelegator
  implements BaseDelegator<FlagRetrievalState>
{
  private readonly worker = FlagRetrievalWorker;
  private readonly investigator = FlagRetrievalInvestigator;

  /**
   * Processes flag retrieval state transition
   *
   * @remarks {
   *   Delegates between investigation and work
   * }
   *
   * @param currentState - Current retrieval state
   * @returns {Promise<FlagRetrievalState>} Updated state after processing
   */
  public async process(
    currentState: FlagRetrievalState
  ): Promise<FlagRetrievalState> {
    if (this.investigator.shouldRetrieveFlag(currentState)) {
      return this.worker.retrieveFlag(currentState);
    }

    return currentState;
  }
}
