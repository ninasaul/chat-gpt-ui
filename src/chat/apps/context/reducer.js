export default function reducer(state, action = {}) {
  const { type, payload = {} } = action;
  //console.log("global reducer:", state, action);

  switch (type) {
    case "SET_STATE":
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
