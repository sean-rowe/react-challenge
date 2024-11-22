/**
 * Represents the state of what should be rendered to the user
 */
export interface IRenderState {
  readonly displayType: "loading" | "error" | "characters";
  readonly errorMessage?: string | null;
  readonly characters?: string[] | null;
}

/**
 * Immutable state representing what should be rendered to the user
 */
export class RenderState implements IRenderState {
  private readonly _displayType: "loading" | "error" | "characters";
  private readonly _errorMessage?: string | null;
  private readonly _characters?: string[] | null;

  constructor(state: IRenderState) {
    this._displayType = state.displayType;
    this._errorMessage = state.errorMessage;
    this._characters = state.characters;
    Object.freeze(this);
  }

  /**
   * The type of display to show
   */
  get displayType(): "loading" | "error" | "characters" {
    return this._displayType;
  }

  /**
   * Error message to display if displayType is "error"
   */
  get errorMessage(): string | null | undefined {
    return this._errorMessage;
  }

  /**
   * Characters to display if displayType is "characters"
   */
  get characters(): string[] | null | undefined {
    return this._characters ? [...this._characters] : this._characters;
  }
}
