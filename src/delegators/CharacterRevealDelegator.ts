// src/delegators/CharacterRevealDelegator.ts

import { BaseDelegator } from "../patterns/BasePatterns";
import { CharacterRevealState } from "../states/CharacterRevealState";
import {ICharacterInvestigator} from "../investigators/CharacterInvestigator";
import {ICharacterRevealWorker} from "../workers/CharacterRevealWorker";

/**
 * Delegator coordinating character reveal process
 *
 * @remarks {
 *   Coordinates between investigator and worker for character reveal
 *   Implements BaseDelegator for character reveal state processing
 * }
 *
 * @example {
 *   const delegator = new CharacterRevealDelegator(investigator, worker);
 *   const newState = delegator.process(currentState);
 * }
 *
 * @testScenario {
 *   Given: State with waiting characters exists
 *   When: process called
 *   And: investigator approves reveal
 *   Then: worker reveals next character
 *   And: Returns updated state
 *
 *   Given: State with no waiting characters
 *   When: process called
 *   And: investigator denies reveal
 *   Then: Returns unchanged state
 * }
 */
export class CharacterRevealDelegator implements BaseDelegator<CharacterRevealState> {
  constructor(
      private readonly investigator: ICharacterInvestigator,
      private readonly worker: ICharacterRevealWorker
  ) {}

  /**
   * Processes character reveal state transition
   *
   * @remarks {
   *   Delegates between investigation and work
   * }
   *
   * @param currentState - Current reveal state
   * @returns {CharacterRevealState} Updated state after processing
   */
  public process(currentState: CharacterRevealState): CharacterRevealState {
    if (this.investigator.shouldRevealNextCharacter(currentState)) {
      return this.worker.revealNextCharacter(currentState);
    }

    return currentState;
  }
}