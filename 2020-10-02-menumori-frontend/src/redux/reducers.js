export const types = {
  SETUSERANDJWT: "SETUSERANDJWT",
  UNSETUSERANDJWT: "UNSETUSERANDJWT",
};

const initialState = {
  jwt: "",
  user: null,
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.SETUSERANDJWT:
      return {
        //...state,
        user: payload.user,
        jwt: payload.jwt,
      };
    case types.UNSETUSERANDJWT:
      return {
        ...state,
        user: null,
        jwt: "",
      };
    default:
      return state;
  }
}
