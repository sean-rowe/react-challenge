/**
 * Represents state of character-by-character reveal sequence
 *
 * @remarks {
 *   Immutable state tracking:
 *   - Characters already revealed in sequence
 *   - Characters waiting to be revealed
 *   - Whether sequence is complete
 * }
 *
 * @example {
 *   const state = new CharacterRevealState({
 *     charactersRevealedInSequence: ['h', 'e'],
 *     charactersWaitingToBeRevealed: ['l', 'l', 'o'],
 *     revealSequenceComplete: false
 *   });
 * }
 *
 * @testScenario {
 *   Given: Partial sequence revealed
 *   When: State constructed
 *   Then: Revealed and waiting characters accessible
 *   And: State immutable
 *
 *   Given: Complete sequence
 *   When: State constructed
 *   Then: Complete flag indicated
 *   And: State immutable
 * }
 */
export interface ICharacterRevealState {
  readonly charactersRevealedInSequence: string[];
  readonly charactersWaitingToBeRevealed: string[];
  readonly revealSequenceComplete: boolean;
}

export class CharacterRevealState implements ICharacterRevealState {
  private readonly _charactersRevealedInSequence: string[];
  private readonly _charactersWaitingToBeRevealed: string[];
  private readonly _revealSequenceComplete: boolean;

  constructor(state: ICharacterRevealState) {
    this._charactersRevealedInSequence = state.charactersRevealedInSequence;
    this._charactersWaitingToBeRevealed = state.charactersWaitingToBeRevealed;
    this._revealSequenceComplete = state.revealSequenceComplete;
    Object.freeze(this);
  }

  get charactersRevealedInSequence(): string[] {
    return [...this._charactersRevealedInSequence];
  }

  get charactersWaitingToBeRevealed(): string[] {
    return [...this._charactersWaitingToBeRevealed];
  }

  get revealSequenceComplete(): boolean {
    return this._revealSequenceComplete;
  }
}
