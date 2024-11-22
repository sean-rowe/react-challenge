import { FlagRetrievalError } from "../errors/FlagRetrievalError";
import { FlagRetrievalState } from "../states/FlagRetrievalState";

/**
 * Worker handling flag content retrieval
 *
 * @remarks {
 *   Responsible for API interaction and state creation
 * }
 *
 * @example {
 *   const state = FlagRetrievalWorker.createInitialState();
 *   const newState = await FlagRetrievalWorker.retrieveFlag(state);
 * }
 *
 * @testScenario {
 *   Given: Initial state needed
 *   When: createInitialState called
 *   Then: Returns fresh state with nulls
 *
 *   Given: Valid state exists
 *   When: retrieveFlag called
 *   Then: Returns state with API content
 *   And: Handles errors appropriately
 * }
 */
export class FlagRetrievalWorker {
  /**
   * Creates initial retrieval state
   *
   * @remarks {
   *   Sets up clean state for first retrieval
   * }
   *
   * @returns {FlagRetrievalState} Fresh retrieval state
   */
  public static createInitialState(): FlagRetrievalState {
    return new FlagRetrievalState({
      retrievedFlagContent: null,
      retrievalError: null,
    });
  }

  /**
   * Retrieves flag content from API
   *
   * @remarks {
   *   Handles fetch request and response processing
   * }
   *
   * @param currentState - Current retrieval state
   * @returns {Promise<FlagRetrievalState>} Updated state with content or error
   * @exception {FlagRetrievalError} When retrieval preconditions fail
   */
  public static async retrieveFlag(
    currentState: FlagRetrievalState
  ): Promise<FlagRetrievalState> {
    FlagRetrievalError.assertCanRetrieveFlag(currentState);

    try {
      const response = await fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/747269"
      );
      const content = await response.text();

      return new FlagRetrievalState({
        ...currentState,
        retrievedFlagContent: content,
        retrievalError: null,
      });
    } catch (error) {
      return new FlagRetrievalState({
        ...currentState,
        retrievedFlagContent: null,
        retrievalError:
          error instanceof Error ? error.message : "Failed to retrieve flag",
      });
    }
  }
}
