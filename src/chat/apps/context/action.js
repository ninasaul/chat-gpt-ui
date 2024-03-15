export default function action(state, dispatch) {
  const setState = (payload = {}) => {
    dispatch({
      type: "SET_STATE",
      payload,
    });
  };
  return {
    setState,
    setCurrent(current) {

      console.log("setCurrent", current);
      setState({
        current,
      });
    },
    setCurrentApp(currentApp) {
      console.log("setCurrentApp", currentApp);
      setState({
        currentApp,
      });
    }
  };
}
