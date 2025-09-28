import { deleteBulkDataApi, deleteDataApiById } from "./actions.ts";
import { URL_CONSTANTS } from "./urls.ts";

// delete by id
const DeleteUserApi = async (id: any) => {
  return deleteDataApiById(URL_CONSTANTS.delete_user, id);
};
export {
  DeleteUserApi,  
};
