export const types = {
  SETUSERANDJWT: "SETUSERANDJWT",
  UNSETUSERANDJWT: "UNSETUSERANDJWT",
  SETSHALLOWOWNEDBUSINESSDATA: "SETSHALLOWOWNEDBUSINESSDATA",
  SETBUSINESSSETTINGSANDBUSINESSDATA: "SETBUSINESSSETTINGSANDBUSINESSDATA",
  SETBUSINESSSETTINGS: "SETBUSINESSSETTINGS",
};

const initialState = {
  jwt: "",
  user: null,
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.SETUSERANDJWT:
      return {
        ...state,
        user: payload.user,
        jwt: payload.jwt,
      };

    case types.SETSHALLOWOWNEDBUSINESSDATA:
      return {
        ...state,
        ownedBusinesses: payload.data,
      };
    case types.UNSETUSERANDJWT:
      return {
        ...state,
        user: null,
        jwt: "",
      };
    case types.SETBUSINESSSETTINGSANDBUSINESSDATA:
      return {
        ...state,
        businessSettings: payload.businessSettings,
        businessData: payload.businessData,
      };

    case types.SETBUSINESSSETTINGS:
      return {
        ...state,
        businessSettings: payload.businessSettings,
      };
    default:
      return state;
  }
}
