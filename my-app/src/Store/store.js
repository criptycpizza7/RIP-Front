import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./combineRed";

const store = configureStore({reducer: rootReducer});

export {store};
