import { RenderState } from "../states/RenderState";

/**
 * Worker handling display state transformations
 *
 * @remarks {
 *   Creates display states with specific configurations
 * }
 *
 * @example {
 *   const state = DisplayRenderWorker.createErrorDisplay(currentState);
 * }
 *
 * @testScenario {
 *   Given: Current state exists
 *   When: createErrorDisplay called
 *   Then: Returns new state for error display
 * }
 */
export class DisplayRenderWorker {
  /**
   * Creates error display state
   *
   * @remarks {
   *   Creates state configured for error display
   * }
   *
   * @param state - Current render state
   * @returns {RenderState} New error display state
   */
  public static createErrorDisplay(state: RenderState): RenderState {
    return new RenderState({
      ...state,
      displayType: "error",
    });
  }

  /**
   * Creates loading display state
   *
   * @remarks {
   *   Creates state configured for loading display
   * }
   *
   * @param state - Current render state
   * @returns {RenderState} New loading display state
   */
  public static createLoadingDisplay(state: RenderState): RenderState {
    return new RenderState({
      ...state,
      displayType: "loading",
    });
  }

  /**
   * Creates character display state
   *
   * @remarks {
   *   Creates state configured for character display
   * }
   *
   * @param state - Current render state
   * @returns {RenderState} New character display state
   */
  public static createCharacterDisplay(state: RenderState): RenderState {
    return new RenderState({
      ...state,
      displayType: "characters",
    });
  }
}
