import { putDataByIdApi } from "./actions.ts";
import { URL_CONSTANTS } from "./urls.ts";


const UpdateUserApi = async ( id: any,data: any,) => {
  return putDataByIdApi(URL_CONSTANTS.update_user, id, data);
};

export {
  UpdateUserApi,

};