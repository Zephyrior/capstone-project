import api from "../../services/api";

export const SET_TOKEN = "SET_TOKEN";

export const setTokenAction = (token) => ({ type: SET_TOKEN, payload: token });

export const SET_USER = "SET_USER";
export const setUserAction = (user) => ({ type: SET_USER, payload: user });

const token = localStorage.getItem("token");

export const fetchUserAction = () => {
  return async (dispatch) => {
    if (token) {
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setUserAction(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};
