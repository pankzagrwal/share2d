import { combineReducers } from "redux";
import { config, user } from "./reducer.js";
import stores from "./components/StoreList/reducer.js";
import prospects from "./components/Dashboard/reducer.js";
import transaction from "./components/ConsolidatedCommission/reducer.js";
export default combineReducers({
  config,
  user,
  stores,
  prospects,
  transaction,
});
