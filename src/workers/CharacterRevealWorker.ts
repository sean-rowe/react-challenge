// src/workers/CharacterRevealWorker.ts

import { CharacterRevealError } from "../errors/CharacterRevealError";
import { CharacterRevealState } from "../states/CharacterRevealState";

/**
 * Interface for character reveal worker operations
 *
 * @remarks {
 *   Defines contract for character reveal state transitions
 * }
 */
export interface ICharacterRevealWorker {
  /**
   * Creates initial reveal state
   *
   * @remarks {
   *   Sets up state for character-by-character reveal
   * }
   *
   * @param content - String to be revealed
   * @returns {CharacterRevealState} Initial reveal state
   */
  createInitialState(content: string): CharacterRevealState;

  /**
   * Reveals next character in sequence
   *
   * @remarks {
   *   Moves one character from waiting to revealed
   * }
   *
   * @param currentState - Current reveal state
   * @returns {CharacterRevealState} Updated state with next character revealed
   */
  revealNextCharacter(currentState: CharacterRevealState): CharacterRevealState;
}

/**
 * Worker handling character reveal state transitions
 *
 * @remarks {
 *   Creates and updates states for character-by-character reveal
 * }
 *
 * @example {
 *   const worker = new CharacterRevealWorker();
 *   const state = worker.createInitialState("hello");
 *   const newState = worker.revealNextCharacter(state);
 * }
 *
 * @testScenario {
 *   Given: Content string "abc"
 *   When: createInitialState called
 *   Then: Returns state with empty revealed, "abc" waiting
 *
 *   Given: State with "a" revealed, "bc" waiting
 *   When: revealNextCharacter called
 *   Then: Returns state with "ab" revealed, "c" waiting
 *   And: Updates completion status
 * }
 */
export class CharacterRevealWorker implements ICharacterRevealWorker {
  constructor(private readonly error: CharacterRevealError) {}

  /**
   * Creates initial reveal state
   *
   * @remarks {
   *   Sets up state for character-by-character reveal
   * }
   *
   * @param content - String to be revealed
   * @returns {CharacterRevealState} Initial reveal state
   */
  public createInitialState(content: string): CharacterRevealState {
    return new CharacterRevealState({
      charactersRevealedInSequence: [],
      charactersWaitingToBeRevealed: content.split(""),
      revealSequenceComplete: false,
    });
  }

  /**
   * Reveals next character in sequence
   *
   * @remarks {
   *   Moves one character from waiting to revealed
   * }
   *
   * @param currentState - Current reveal state
   * @returns {CharacterRevealState} Updated state with next character revealed
   * @exception {CharacterRevealError} When reveal preconditions fail
   */
  public revealNextCharacter(currentState: CharacterRevealState): CharacterRevealState {
    this.error.assertCanRevealCharacter(currentState);

    const nextChar = currentState.charactersWaitingToBeRevealed[0];
    const remainingChars = currentState.charactersWaitingToBeRevealed.slice(1);

    return new CharacterRevealState({
      ...currentState,
      charactersRevealedInSequence: [
        ...currentState.charactersRevealedInSequence,
        nextChar,
      ],
      charactersWaitingToBeRevealed: remainingChars,
      revealSequenceComplete: remainingChars.length === 0,
    });
  }
}