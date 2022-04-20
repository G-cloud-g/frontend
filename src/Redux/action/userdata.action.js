export const userdata = (payload) => (dispatch) => {
  dispatch({ type: 'UPDATE_USERDATA', payload: payload });
};
