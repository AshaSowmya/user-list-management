import {  deleteDataApiById } from "./actions.ts";
import { URL_CONSTANTS } from "./urls.ts";

const DeleteUserApi = async (id: any) => {
  return deleteDataApiById(URL_CONSTANTS.delete_user, id);
};
export {
  DeleteUserApi,  
};
