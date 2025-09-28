import { getListByApi } from "./actions.ts";
import { URL_CONSTANTS } from "./urls.ts";

const GetAllUser = (params?: any) => {
  return getListByApi(URL_CONSTANTS.get_users, params);
}

export {
  GetAllUser

}