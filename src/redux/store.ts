import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/auth.slice.ts";
import usersSlice from "./slices/user.slice.ts";



const reducer = combineReducers({
  loginUser: loginSlice,
  users: usersSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
