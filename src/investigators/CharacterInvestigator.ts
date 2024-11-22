import { CharacterRevealState } from "../states/CharacterRevealState";

/**
 * Investigates character reveal conditions
 *
 * @remarks {
 *   Determines when next character should be revealed in sequence
 * }
 *
 * @example {
 *   if (CharacterRevealInvestigator.shouldRevealNextCharacter(state)) {
 *     revealNext();
 *   }
 * }
 *
 * @testScenario {
 *   Given: State has characters waiting
 *   And: Sequence not complete
 *   When: Reveal condition checked
 *   Then: Returns true
 *
 *   Given: No characters waiting
 *   Or: Sequence is complete
 *   When: Reveal condition checked
 *   Then: Returns false
 * }
 */
export class CharacterInvestigator {
  /**
   * Determines if next character should be revealed
   *
   * @remarks {
   *   Checks both sequence completion and waiting characters
   * }
   *
   * @param state - Current reveal state
   * @returns {boolean} Whether next character should be revealed
   */
  public static shouldRevealNextCharacter(
    state: CharacterRevealState
  ): boolean {
    return (
      !state.revealSequenceComplete &&
      state.charactersWaitingToBeRevealed.length > 0
    );
  }

  public static hasCharactersWaitingToBeRevealed(
      state: CharacterRevealState | null
  ): boolean {
    return (
        state !== null &&
        state.charactersWaitingToBeRevealed.length > 0 &&
        !state.revealSequenceComplete
    );
  }
}
