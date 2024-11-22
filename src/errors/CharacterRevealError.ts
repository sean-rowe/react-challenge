import { CharacterRevealState } from "../states/CharacterRevealState";
import { CharacterInvestigator } from "../investigators/CharacterInvestigator";

/**
 * Error class for character reveal process
 *
 * @remarks {
 *   Provides assertion methods to validate character reveal operations
 * }
 *
 * @example {
 *   CharacterRevealError.assertCanRevealCharacter(state);
 *   // Proceeds if valid, throws if invalid
 * }
 *
 * @testScenario {
 *   Given: State with no waiting characters
 *   When: assertCanRevealCharacter called
 *   Then: Throws error with message
 *
 *   Given: State with waiting characters
 *   When: assertCanRevealCharacter called
 *   Then: Does not throw error
 * }
 */
export class CharacterRevealError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CharacterRevealError";
  }

  /**
   * Asserts character can be revealed
   *
   * @remarks {
   *   Uses investigator to check reveal conditions
   * }
   *
   * @param state Current reveal state
   * @throws {CharacterRevealError} If character cannot be revealed
   */
  public static assertCanRevealCharacter(
    state: CharacterRevealState
  ): asserts state is CharacterRevealState {
    if (!CharacterInvestigator.shouldRevealNextCharacter(state)) {
      throw new CharacterRevealError(
        "Cannot reveal character: Sequence complete or no characters remaining"
      );
    }
  }
}
