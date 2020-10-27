export const types = {
  SETUSERANDJWT: "SETUSERANDJWT",
  SETSTOREBYLOGOUT: "SETSTOREBYLOGOUT",
  SETSHALLOWOWNEDBUSINESSDATA: "SETSHALLOWOWNEDBUSINESSDATA",
  SETBUSINESSSETTINGSANDBUSINESSDATA: "SETBUSINESSSETTINGSANDBUSINESSDATA",
  SETBUSINESSSETTINGS: "SETBUSINESSSETTINGS",
};

const initialState = {
  jwt: "",
  user: null,
  ownedBusinesses: null,
  businessSettings: null,
  businessData: null,
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
    case types.SETSTOREBYLOGOUT:
      return {
        ...state,
        user: null,
        jwt: "",
        ownedBusinesses: null,
        businessSettings: null,
        businessData: null,
        ownedBusinesses: [],
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
