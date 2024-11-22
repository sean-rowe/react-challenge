import React, { useState, useEffect } from "react";
import { FlagRetrievalState } from "./states/FlagRetrievalState";
import { CharacterRevealState } from "./states/CharacterRevealState";
import { FlagRetrievalWorker } from "./workers/FlagRetrievalWorker";
import { CharacterRevealWorker } from "./workers/CharacterRevealWorker";
import { FlagRetrievalDelegator } from "./delegators/FlagRetrievalDelegator";
import { CharacterRevealDelegator } from "./delegators/CharacterRevealDelegator";
import { DisplayRenderDelegator } from "./delegators/DisplayRenderDelegator";
import { FlagRetrievalInvestigator } from "./investigators/FlagRetrievalInvestigator";
import { CharacterInvestigator } from "./investigators/CharacterInvestigator";

const FlagDisplay: React.FC = () => {
  const [retrievalState, setRetrievalState] = useState<FlagRetrievalState>(
    FlagRetrievalWorker.createInitialState
  );

  const [revealState, setRevealState] = useState<CharacterRevealState | null>(
    null
  );

  const flagRetrievalDelegator:  FlagRetrievalDelegator = new FlagRetrievalDelegator();
  const revealDelegator:  CharacterRevealDelegator = new CharacterRevealDelegator();
  const renderDelegator:  DisplayRenderDelegator = new DisplayRenderDelegator();

  useEffect(() => {
    let mounted = true;

    const processRetrieval = async () => {
      try {
        const flagRetrievalState: FlagRetrievalState = await flagRetrievalDelegator.process(retrievalState);

        if (!mounted) {
          return;
        }

        setRetrievalState(flagRetrievalState);

        if (flagRetrievalState.retrievedFlagContent && mounted) {
          const initialRevealState: CharacterRevealState = CharacterRevealWorker.createInitialState(
            flagRetrievalState.retrievedFlagContent
          );

          setRevealState(initialRevealState);
        }
      } catch (error) {
        if (!mounted) {
          return;
        }

        setRetrievalState(
          new FlagRetrievalState({
            retrievedFlagContent: null,
            retrievalError:
              error instanceof Error ? error.message : "Unknown error occurred",
          })
        );
      }
    };

    if (FlagRetrievalInvestigator.shouldRetrieveFlag(retrievalState)) {
      processRetrieval();
    }

    return () => {
      mounted = false;
    };
  }, [retrievalState]);

  useEffect(() => {
    if (!revealState) return;

    let timeoutId: NodeJS.Timeout;

    if (CharacterInvestigator.shouldRevealNextCharacter(revealState)) {
      timeoutId = setTimeout(() => {
        setRevealState(revealDelegator.process(revealState));
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [revealState]);

  if (retrievalState.retrievalError) {
    return <div>Error: {retrievalState.retrievalError}</div>;
  }

  if (!revealState) {
    return <div>Loading...</div>;
  }

  return (
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
      {revealState.charactersRevealedInSequence.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </div>
  );
};

export default FlagDisplay;
