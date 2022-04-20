/* eslint default-param-last: 0 */
const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_USERDATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
