import { getListByApi, viewDataByApi } from "./actions.ts";
import { URL_CONSTANTS } from "./urls.ts";

//User
const GetAllUser = (params?: any) => {
  return getListByApi(URL_CONSTANTS.get_users, params);
}


export {
  GetAllUser

}