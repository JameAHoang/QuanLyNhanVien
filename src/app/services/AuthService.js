import { Store } from "../redux/Store";

export const signout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

let authenticated = true;

export const getAuthStatus = () => authenticated;

Store.subscribe((state) => {
  if (state) authenticated = state.auth.isUserLoggedIn;
});
