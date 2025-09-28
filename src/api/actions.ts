"use client";
import { hostConfig } from "../config/index.ts";
import axios from "axios";

const responseHandler = (response: any) => {
  if (response.status === 401) {
    // localStorage.clear();
    // if (!window?.location?.href?.includes("/login")) {
    //   window.location.href = "/login";
    // }

    return response;
  } else if (response.status === 200) {
    return response;
  } else if (response.status === 400) {
    return response;
  } else if (response.status === 404) {
    return response;
  } else if (response.status === 403) {
    // localStorage.clear();
    return response;
  }
  else if (response.status === 422) {
    return response;
  } else if (response.status === 502) {
    return response;
  } else if (response.status === 500) {
    return response;
  } else if (response.status === 501) {
    return response;
  } else if (response.status === 201) {
    return response;
  } else {
    return false;
  }
};

const errorHandler = (error: any) => {
  return false;
};


const getListByApi = async (requestUrl: string, params?: any) => {
  const token = localStorage.getItem("accessToken");

  // Build query string from params dynamically
  let queryString = "";
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    queryString = `?${searchParams.toString()}`;
  }

  return fetch(`${hostConfig?.API_URL}${requestUrl}${queryString}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
      'x-api-key': 'reqres-free-v1',
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => responseHandler(response))
    .then((data) => data.json())
    .catch((error) => {
      errorHandler(error);
    });
};


const postDataApi = async (requestUrl: string, params: any) => {
  const token = await localStorage.getItem("accessToken");
  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      'x-api-key': 'reqres-free-v1',
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return responseHandler(response);
    })
    .then((result) => {
      return result.status === 200 ||
        result.status === 201 ||
        result.status === 400 ||
        result.status === 401 ||
        result.status === 404 ||
        result.status === 422 ||
        result.status === 502
        ? result.json()
        : result;
    })
    .catch((error) => {
      errorHandler(error);
    });
};

const postFormDataApi = async (requestUrl: string, params: any) => {
  const token = await localStorage.getItem("accessToken");
  return axios
    .post(`${hostConfig.API_URL}${requestUrl}`, params, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      return responseHandler(response);
    })
    .then((result) => {
      return result.status === 200 ||
        result.status === 201 ||
        result.status === 400 ||
        result.status === 401 ||
        result.status === 422 ||
        result.status === 502
        ? result.data
        : result;
    })
    .catch((error) => {
      return responseHandler(error);
    });
};

const deleteDataApiById = async (requestUrl: string, dataId: number) => {
  const token = await localStorage.getItem("accessToken");
  return fetch(`${hostConfig?.API_URL}${requestUrl}/${dataId}`, {
    method: "delete",
    headers: {
      "ngrok-skip-browser-warning": "true",
      'x-api-key': 'reqres-free-v1',
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return responseHandler(response);
    })
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      errorHandler(error);
    });
};
const putDataByIdApi = (requestUrl: string, id: number, params: any) => {
  const token = localStorage.getItem("accessToken");
  return fetch(`${hostConfig.API_URL}${requestUrl}/${id}`, {
    method: "PUT",
    headers: {
      "ngrok-skip-browser-warning": "true",
      'x-api-key': 'reqres-free-v1',
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then((response) => responseHandler(response))
    .then((result) =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result,
    )
    .catch((error) => {
      errorHandler(error);
    });
};


export {
  postDataApi,
  getListByApi,
  deleteDataApiById,
  putDataByIdApi,
  postFormDataApi,
};
