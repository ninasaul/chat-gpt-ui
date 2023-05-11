export default function reducer(state, action = {}) {
  const { type, payload = {} } = action;
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
