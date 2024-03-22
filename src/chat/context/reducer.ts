import { GlobalState, GlobalAction } from "./types";

// TODO: refactor this to use proper actions and types
export default function reduce(state: GlobalState, action: GlobalAction): GlobalState {
  const { type, payload = {} } = action;
  // console.log("context reducer:", state, action);
  switch (type) {
    case "CHANGE_MESSAGE":
    case "IS_CONFIG":
    case "SET_STATE":
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
