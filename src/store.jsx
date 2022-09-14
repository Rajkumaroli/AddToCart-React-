import { createStore } from "redux";
import RootReducer from "./redux/reducers/main";

const store = createStore(RootReducer);
export default store;