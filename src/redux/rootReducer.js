import { combineReducers } from "redux";
import { messagesReducer } from "./messagesReducer";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
    messages: messagesReducer,
    app: appReducer
})