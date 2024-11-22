import { RenderState } from "../states/RenderState";

/**
 * Investigates display render conditions
 *
 * @remarks {
 *   Determines which type of display should be shown
 * }
 *
 * @example {
 *   if (DisplayRenderInvestigator.shouldShowError(state)) {
 *     renderError();
 *   }
 * }
 *
 * @testScenario {
 *   Given: Error display condition
 *   When: Error condition checked
 *   Then: Returns true if error exists and type matches
 *
 *   Given: Loading display condition
 *   When: Loading condition checked
 *   Then: Returns true if display type is loading
 *
 *   Given: Character display condition
 *   When: Character condition checked
 *   Then: Returns true if characters exist and type matches
 * }
 */
export class DisplayRenderInvestigator {
  /**
   * Determines if error should be shown
   *
   * @remarks {
   *   Checks both display type and error message existence
   * }
   *
   * @param state - Current render state
   * @returns {boolean} Whether error should be shown
   */
  public static shouldShowError(state: RenderState): boolean {
    return state.displayType === "error" && !!state.errorMessage;
  }

  /**
   * Determines if loading should be shown
   *
   * @remarks {
   *   Checks display type for loading status
   * }
   *
   * @param state - Current render state
   * @returns {boolean} Whether loading should be shown
   */
  public static shouldShowLoading(state: RenderState): boolean {
    return state.displayType === "loading";
  }

  /**
   * Determines if characters should be shown
   *
   * @remarks {
   *   Checks both display type and characters existence
   * }
   *
   * @param state - Current render state
   * @returns {boolean} Whether characters should be shown
   */
  public static shouldShowCharacters(state: RenderState): boolean {
    return state.displayType === "characters" && !!state.characters;
  }
}
