import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import channelReducer from "../features/channel/channelSlice";

// Setting up redux store
export default configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
