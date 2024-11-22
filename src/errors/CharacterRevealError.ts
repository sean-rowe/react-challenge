import { CharacterRevealState } from "../states/CharacterRevealState";
import {CharacterInvestigator} from "../investigators/CharacterInvestigator";

/**
 * Interface for character reveal error operations
 *
 * @remarks {
 *   Defines contract for character reveal validation
 * }
 */
export interface ICharacterRevealError {
  /**
   * Asserts character can be revealed
   *
   * @remarks {
   *   Validates state for character reveal
   * }
   *
   * @param state Current reveal state
   * @throws {CharacterRevealError} If character cannot be revealed
   */
  assertCanRevealCharacter(
      state: CharacterRevealState
  ): asserts state is CharacterRevealState;
}

/**
 * Error class for character reveal process
 *
 * @remarks {
 *   Provides assertion methods to validate character reveal operations
 * }
 *
 * @example {
 *   const error = new CharacterRevealError("Error message");
 *   error.assertCanRevealCharacter(state);
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
export class CharacterRevealError extends Error implements ICharacterRevealError {
  private readonly investigator: CharacterInvestigator;

  constructor(message: string) {
    super(message);
    this.name = "CharacterRevealError";
    this.investigator = new CharacterInvestigator();
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
  public assertCanRevealCharacter(state: CharacterRevealState): asserts state is CharacterRevealState {
    if (!this.investigator.shouldRevealNextCharacter(state)) {
      throw new CharacterRevealError(
          "Cannot reveal character: Sequence complete or no characters remaining"
      );
    }
  }
}