import { types } from "./reducers";

export const setUserAndJWT = (user, jwt) => {
  return { type: types.SETUSERANDJWT, payload: { user, jwt } };
};

export const unsetUserAndJWT = () => {
  return { type: types.UNSETUSERANDJWT, payload: {} };
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
