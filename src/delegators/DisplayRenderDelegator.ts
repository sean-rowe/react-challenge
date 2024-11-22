import { DisplayRenderInvestigator } from "../investigators/DisplayRenderInvestigator";
import { BaseDelegator } from "../patterns/BasePatterns";
import { RenderState } from "../states/RenderState";
import { DisplayRenderWorker } from "../workers/DisplayRenderWorker";

/**
 * Delegator coordinating display render process
 *
 * @remarks {
 *   Coordinates between investigator and worker for display creation
 *   Implements BaseDelegator for render state processing
 * }
 *
 * @example {
 *   const delegator = new DisplayRenderDelegator();
 *   const newState = delegator.process(currentState);
 * }
 *
 * @testScenario {
 *   Given: Error state exists
 *   When: process called
 *   And: investigator indicates error display
 *   Then: Returns error render state
 *
 *   Given: No reveal state exists
 *   When: process called
 *   Then: Returns loading render state
 *
 *   Given: Active reveal state exists
 *   When: process called
 *   Then: Returns character display render state
 * }
 */
export class DisplayRenderDelegator implements BaseDelegator<RenderState> {
  private readonly worker = DisplayRenderWorker;
  private readonly investigator = DisplayRenderInvestigator;

  /**
   * Processes render state transition
   *
   * @remarks {
   *   Delegates between investigation and work
   * }
   *
   * @param state - Current render state
   * @returns {RenderState} Updated render state
   */
  public process(state: RenderState): RenderState {
    if (this.investigator.shouldShowError(state)) {
      return this.worker.createErrorDisplay(state);
    }

    if (this.investigator.shouldShowLoading(state)) {
      return this.worker.createLoadingDisplay(state);
    }

    if (this.investigator.shouldShowCharacters(state)) {
      return this.worker.createCharacterDisplay(state);
    }

    return state;
  }
}
