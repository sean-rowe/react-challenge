/**
 * Base delegator pattern defining core processing functionality
 *
 * @remarks {
 *   Delegators coordinate single state transitions through process()
 * }
 *
 * @example {
 *   class MyDelegator implements BaseDelegator<MyState> {
 *     public process(state: MyState): MyState {
 *       return this.worker.createNext(state);
 *     }
 *   }
 * }
 *
 * @testScenario {
 *   Given: State needs processing
 *   When: Delegator processes state
 *   Then: Updated state is returned
 * }
 */
export interface BaseDelegator<T> {
  process(state: T): T | Promise<T>;
}