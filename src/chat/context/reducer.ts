import { GlobalState, GlobalAction } from "./initState";

export default function reduce(state: GlobalState, action: GlobalAction): GlobalState {
  const { type, payload = {} } = action;
  // console.log("context reducer:", state, action);
  switch (type) {
    case "CHANGE_MESSAGE":
      return {
        ...state,
        ...payload,
      };
    case "IS_CONFIG":
      return {
        ...state,
        ...payload,
      };
    case "SET_STATE":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
