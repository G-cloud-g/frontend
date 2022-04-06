const INIT_STATE = {
    snackbar: false, //boolean
    type: "success", //success info warning error
    message: "", //text
  };
  
 const SnackbarReducer= (state = INIT_STATE, action) => {
    switch (action.type) {
      case "UPDATE_SNACK":
        return { ...state, ...action.payload };
      case "WARNING_SNACK":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  

  export default SnackbarReducer;

