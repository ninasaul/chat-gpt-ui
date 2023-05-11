export default function action(state, dispatch) {
  const setState = (payload = {}) => {
    dispatch({
      type: "SET_STATE",
      payload,
    });
  };
  return {
    setState,
    toggleItem(current) {
      setState({
        current,
      });
    },
  };
}
