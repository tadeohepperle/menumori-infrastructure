import { types } from "./reducers";

export const setUserAndJWT = (user, jwt) => {
  return { type: types.SETUSERANDJWT, payload: { user, jwt } };
};

export const setStoreByLogout = () => {
  return { type: types.SETSTOREBYLOGOUT, payload: {} };
};

export const setShallowOwnedBusinessesData = (data) => {
  return { type: types.SETSHALLOWOWNEDBUSINESSDATA, payload: { data } };
};

export const setBusinessSettingsAndBusinessData = (
  businessSettings,
  businessData
) => {
  return {
    type: types.SETBUSINESSSETTINGSANDBUSINESSDATA,
    payload: { businessSettings, businessData },
  };
};

export const setBusinessSettings = (businessSettings) => {
  return {
    type: types.SETBUSINESSSETTINGS,
    payload: { businessSettings },
  };
};

/*



// EXAMPLES FROM REDUXT THUNK NEXT EXAMPLE


// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  })

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
  }, 1000)

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT })

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT })

// RESET COUNTER
export const resetCount = () => ({ type: types.RESET })






















*/
