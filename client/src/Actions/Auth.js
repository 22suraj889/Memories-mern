import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

//register logic
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

//login logic
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
