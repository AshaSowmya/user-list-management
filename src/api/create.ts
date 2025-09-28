import { postDataApi } from "./actions.ts";
import { URL_CONSTANTS } from "./urls.ts";

const Userlogin = async (data: any) => {
  return postDataApi(URL_CONSTANTS?.login, data);
};
const UserRegister = async (data: any) => {
  return postDataApi(URL_CONSTANTS?.register, data);
};
const CreateUser = async (data: any) => {
  return postDataApi(URL_CONSTANTS?.create_user, data);
};

export {
  Userlogin,
  UserRegister,
  CreateUser,
};
