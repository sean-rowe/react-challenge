import {CharacterRevealState} from "../states/CharacterRevealState";

/**
 * Interface for character reveal investigation operations
 *
 * @remarks {
 *   Defines contract for determining character reveal conditions
 * }
 */
export interface ICharacterInvestigator {
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
    shouldRevealNextCharacter(state: CharacterRevealState): boolean;

    /**
     * Checks if there are characters waiting to be revealed
     *
     * @remarks {
     *   Validates state and character availability
     * }
     *
     * @param state - Current reveal state
     * @returns {boolean} Whether characters are waiting
     */
    hasCharactersWaitingToBeRevealed(state: CharacterRevealState | null): boolean;
}

/**
 * Investigates character reveal conditions
 *
 * @remarks {
 *   Determines when next character should be revealed in sequence
 * }
 *
 * @example {
 *   const investigator = new CharacterInvestigator();
 *   if (investigator.shouldRevealNextCharacter(state)) {
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
export class CharacterInvestigator implements ICharacterInvestigator {
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
    public shouldRevealNextCharacter(state: CharacterRevealState): boolean {
        return (!state.revealSequenceComplete && state.charactersWaitingToBeRevealed.length > 0);
    }
     /**
     * Checks if there are characters waiting to be revealed within the given state.
     *
     * @remarks {
     *   Validates the provided state to determine if there are characters pending revelation.
     *   It ensures that the state is not null, checks the length of the characters waiting to be revealed,
     *   and verifies that the reveal sequence is not complete.
     * }
     *
     * @param {CharacterRevealState | null} state - The state object to check, which can be null.
     * @return {boolean} - Returns true if there are characters waiting to be revealed and the reveal sequence is not complete; otherwise, false.
     */
    public hasCharactersWaitingToBeRevealed(state: CharacterRevealState | null): boolean {
        return (state !== null && state.charactersWaitingToBeRevealed.length > 0 && !state.revealSequenceComplete);
    }
}