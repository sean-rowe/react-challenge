// src/components/FlagDisplay.tsx

import React, { useState, useEffect } from "react";
import { FlagRetrievalState } from "./states/FlagRetrievalState";
import { CharacterRevealState } from "./states/CharacterRevealState";
import { FlagRetrievalWorker } from "./workers/FlagRetrievalWorker";
import { CharacterRevealWorker } from "./workers/CharacterRevealWorker";
import { FlagRetrievalDelegator } from "./delegators/FlagRetrievalDelegator";
import { CharacterRevealDelegator } from "./delegators/CharacterRevealDelegator";
import { FlagRetrievalInvestigator } from "./investigators/FlagRetrievalInvestigator";
import { CharacterInvestigator } from "./investigators/CharacterInvestigator";
import { FlagRetrievalError } from "./errors/FlagRetrievalError";
import { CharacterRevealError } from "./errors/CharacterRevealError";

interface ErrorViewProps {
  error: string | null;
}

interface CharacterSequenceViewProps {
  characters: string[];
}

/**
 * @component
 * ErrorView component
 *
 * This functional component is used to display an error message.
 * It accepts an `error` prop and displays it within a `div` element.
 *
 * @param {ErrorViewProps} props The component props
 * @param {string} props.error The error message to display
 *
 * @returns {React.ReactElement} The rendered component
 */
const ErrorView: React.FC<ErrorViewProps> = ({ error }: ErrorViewProps): React.ReactElement => (
    <div>Error: {error}</div>
);

/**
 * @component
 * LoadingView is a React functional component that displays a loading message.
 *
 * It renders a simple `div` element containing the text "Loading...". This component is typically used
 * to indicate that some asynchronous operation is in progress and the user should wait.
 *
 * @returns {React.ReactElement} The rendered component
 */
const LoadingView: React.FC = (): React.ReactElement => (
    <div>Loading...</div>
);

/**
 * A functional React component that displays a sequence of characters
 * styled in a monospace font. Each character is rendered within a
 * span element, and the sequence is displayed in a horizontal row.
 *
 * @param {CharacterSequenceViewProps} props - The properties for the component.
 * @param {string[]} props.characters - An array of characters to display.
 *
 * @returns {React.ReactElement} A JSX element containing the styled sequence of characters.
 */
const CharacterSequenceView: React.FC<CharacterSequenceViewProps> = ({ characters }: CharacterSequenceViewProps): React.ReactElement => (
    <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.25em",
          fontFamily: "monospace",
          fontSize: "2em",
          padding: "1em",
        }}
    >
      {characters.map((char, index) => (
          <span key={index}>{char}</span>
      ))}
    </div>
);

/**
 * The FlagTeam class is responsible for handling both flag retrieval and character reveal operations.
 * It combines different components including workers, investigators, and delegators to manage the process.
 */
class FlagTeam {
  public readonly flagError: FlagRetrievalError;
  public readonly charError: CharacterRevealError;
  public readonly flagWorker: FlagRetrievalWorker;
  public readonly charWorker: CharacterRevealWorker;
  public readonly flagInvestigator: FlagRetrievalInvestigator;
  public readonly charInvestigator: CharacterInvestigator;
  public readonly flagRetrievalDelegator: FlagRetrievalDelegator;
  public readonly revealDelegator: CharacterRevealDelegator;
  public readonly retrievalState: FlagRetrievalState;
  public readonly setRetrievalState: (state: FlagRetrievalState) => void;
  public readonly revealState: CharacterRevealState | null;
    public readonly setRevealState: React.Dispatch<React.SetStateAction<CharacterRevealState | null>>;

  constructor() {
    this.flagError = new FlagRetrievalError("Flag retrieval error");
    this.charError = new CharacterRevealError("Character reveal error");

    // Create worker instances
    this.flagWorker = new FlagRetrievalWorker(this.flagError);
    this.charWorker = new CharacterRevealWorker(this.charError);

    // Create investigator instances
    this.flagInvestigator = new FlagRetrievalInvestigator();
    this.charInvestigator = new CharacterInvestigator();

    // Create delegator instances with dependencies
    this.flagRetrievalDelegator = new FlagRetrievalDelegator(
        this.flagInvestigator,
        this.flagWorker
    );

    this.revealDelegator = new CharacterRevealDelegator(
        this.charInvestigator,
        this.charWorker
    );

    [this.retrievalState, this.setRetrievalState] = useState<FlagRetrievalState>(() =>
        this.flagWorker.createInitialState()
    );

    [this.revealState, this.setRevealState] = useState<CharacterRevealState | null>(null);
  }
}

/**
 * FlagDisplay is a React functional component responsible for retrieving
 * and displaying flag content with character reveal animation.
 *
 * This component interacts with a FlagTeam instance to manage retrieval states
 * and reveal states for flag content. It uses an asynchronous effect to handle
 * the retrieval of flag content and another effect for the character reveal animation.
 *
 * During the content retrieval process, it attempts to obtain the flag content,
 * handles any retrieval errors, and sets the retrieval state accordingly. Once
 * the flag content is retrieved successfully, it initializes the character reveal
 * state and sequentially reveals each character with a delay.
 *
 * If there is a retrieval error, an ErrorView component is rendered. While the
 * character sequence is being revealed, a LoadingView component is shown.
 * After the characters have been revealed, it displays the content using the CharacterSequenceView component.
 */
const FlagDisplay: React.FC = () => {
  const team = new FlagTeam()

  /**
   * useEffect hook to manage the asynchronous retrieval of a flag
   * and the subsequent reveal of characters based on that flag's content.
   *
   * @function
   *
   * @description
   * This hook ensures the retrieval process is started if the flag should be retrieved.
   * It handles the state updates based on the retrieval results and prevents updates after
   * the component is unmounted to avoid memory leaks and inconsistent state.
   *
   * Process:
   * - Initializes the `mounted` flag to ensure component is still mounted before making state updates.
   * - Calls `processRetrieval` to handle the process asynchronously.
   * - Should the flag be retrieved (`team.flagInvestigator.shouldRetrieveFlag`),
   *   invokes `processRetrieval`.
   * - Returns clean-up function to mark the component as unmounted.
   *
   * @param {Array<any>} dependencies - The effect depends on `team.retrievalState` to re-run.
   */
  useEffect(() => {
    // Flag to ensure the component is still mounted
    let mounted = true;

    /**
     * Asynchronously processes the flag retrieval and updates the state accordingly.
     *
     * @async
     * @function processRetrieval
     * @returns {Promise<void>}
     *
     * @throws Will set the retrieval state with an error message if the process fails.
     */
    const processRetrieval = async (): Promise<void> => {
      try {
        // Attempt to retrieve the flag
        const flagRetrievalState: FlagRetrievalState = await team.flagRetrievalDelegator.process(team.retrievalState);

        if (!mounted) {
          return;
        }

        // Update the retrieval state with the retrieved flag content
        team.setRetrievalState(flagRetrievalState);

        if (flagRetrievalState.retrievedFlagContent && mounted) {
          // Create and update the reveal state based on the retrieved flag content
          const initialRevealState: CharacterRevealState = team.charWorker.createInitialState(
              flagRetrievalState.retrievedFlagContent
          );

          team.setRevealState(initialRevealState);
        }
      } catch (error) {
        if (!mounted) {
          return;
        }

        // Handle errors during the retrieval process
        team.setRetrievalState(
            new FlagRetrievalState({
              retrievedFlagContent: null,
              retrievalError: error instanceof Error ? error.message : "Unknown error occurred",
            })
        );
      }
    };

    // Check if the flag should be retrieved and invoke the retrieval process
    if (team.flagInvestigator.shouldRetrieveFlag(team.retrievalState)) {
      void processRetrieval();
    }

    // Cleanup function to mark the component as unmounted
    return () => {
      mounted = false;
    };
  },
  [team.retrievalState]);

  /**
   * Effect to manage the reveal of characters when `team.revealState` changes.
   * - If `team.revealState` is not present, the effect exits immediately.
   * - Sets a timeout to reveal the next character if it should be revealed.
   * - Cleans up the timeout when the effect is re-run or the component unmounts.
   */
  useEffect(() => {
    // If there is no revealState, exit the effect early.
    if (!team.revealState) {
      return;
    }

    // Declare a variable to hold the timeout ID.
    let timeoutId: NodeJS.Timeout;

    // Check if the next character should be revealed.
    if (team.charInvestigator.shouldRevealNextCharacter(team.revealState)) {
      timeoutId = setTimeout(() => {// Process the current reveal state and update it.
        team.setRevealState(team.revealDelegator.process(team.revealState!));
      }, 500);
    }

    // Cleanup function to clear the timeout if it was set.
    return () => {
      if (timeoutId) {
        // Clear the timeout to avoid memory leaks.
        clearTimeout(timeoutId);
      }
    };
  }, [team.revealState]);

  if (team.retrievalState.retrievalError) {
    return <ErrorView error={team.retrievalState.retrievalError} />;
  }

  if (!team.revealState) {
    return <LoadingView />;
  }

  return <CharacterSequenceView characters={team.revealState.charactersRevealedInSequence} />;
};

export default FlagDisplay;