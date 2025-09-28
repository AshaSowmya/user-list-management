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

const getListByFileApi = async (requestUrl: string, params?: any) => {
  const token = localStorage.getItem("accessToken");
  // console.log("token", token);
  let getParams = "?";

  if (params && params.id && params.id !== undefined) {
    getParams += `id=${params.id}`;
  }
  if (params && params.page && params.page !== undefined) {
    getParams += `page=${params.page}`;
  }
  if (params && params.limit && params.limit !== undefined) {
    getParams += `&limit=${params.limit}`;
  }
  if (params && params.search && params.search !== undefined) {
    getParams += `&search=${params.search}`;
  }
  if (params && params.is_sold && params.is_sold !== undefined) {
    getParams += `&is_sold=${params.is_sold}`;
  }
  if (params && params.status && params.status !== undefined) {
    getParams += `&status=${params.status}`;
  }

  if (params && params.from_date && params.from_date !== undefined) {
    getParams += `&from_date=${params.from_date}`;
  }
  if (params && params.to_date && params.to_date !== undefined) {
    getParams += `&to_date=${params.to_date}`;
  }
  if (params && params.start_date && params.start_date !== undefined) {
    getParams += `&start_date=${params.start_date}`;
  }
  if (params && params.end_date && params.end_date !== undefined) {
    getParams += `&end_date=${params.end_date}`;
  }

  if (
    params &&
    params.format &&
    params.format !== null &&
    params.format !== undefined
  ) {
    getParams += `&format=${params.format}`;
  }
  if (
    params &&
    params.type &&
    params.type !== null &&
    params.type !== undefined
  ) {
    getParams += `&type=${params.type}`;
  }
  if (
    params &&
    params.days &&
    params.days !== null &&
    params.days !== undefined
  ) {
    getParams += `&days=${params.days}`;
  }
  if (
    params &&
    params.subcategories &&
    params.subcategories !== null &&
    params.subcategories !== undefined
  ) {
    getParams += `&subcategories=${params.subcategories}`;
  }
  if (
    params &&
    params.max_price &&
    params.max_price !== null &&
    params.max_price !== undefined &&
    params.max_price !== ""
  ) {
    getParams += `&max_price=${params.max_price}`;
  }
  if (
    params &&
    params.min_price &&
    params.min_price !== null &&
    params.min_price !== undefined &&
    params.min_price !== ""
  ) {
    getParams += `&min_price=${params.min_price}`;
  }
  if (
    params &&
    params.created_days &&
    params.created_days !== null &&
    params.created_days !== undefined &&
    params.created_days !== ""
  ) {
    getParams += `&created_days=${params.created_days}`;
  }
  if (
    params &&
    params.minted_days &&
    params.minted_days !== null &&
    params.minted_days !== undefined &&
    params.minted_days !== ""
  ) {
    getParams += `&minted_days=${params.minted_days}`;
  }
  if (
    params &&
    params.mint_days &&
    params.mint_days !== null &&
    params.mint_days !== undefined &&
    params.mint_days !== ""
  ) {
    getParams += `&mint_days=${params.mint_days}`;
  }
  if (
    params &&
    params.sold_days &&
    params.sold_days !== null &&
    params.sold_days !== undefined &&
    params.sold_days !== ""
  ) {
    getParams += `&sold_days=${params.sold_days}`;
  }
  if (
    params &&
    params.list !== null &&
    params.list !== undefined &&
    params.list !== ""
  ) {
    getParams += `&list=${params.list}`;
  }
  if (
    params &&
    params.created_from_date !== null &&
    params.created_from_date !== undefined &&
    params.created_from_date !== ""
  ) {
    getParams += `&created_from_date=${params.created_from_date}`;
  }
  if (
    params &&
    params.created_to_date !== null &&
    params.created_to_date !== undefined &&
    params.created_to_date !== ""
  ) {
    getParams += `&created_to_date=${params.created_to_date}`;
  }
  if (
    params &&
    params.minted_from_date !== null &&
    params.minted_from_date !== undefined &&
    params.minted_from_date !== ""
  ) {
    getParams += `&minted_from_date=${params.minted_from_date}`;
  }
  if (
    params &&
    params.minted_to_date !== null &&
    params.minted_to_date !== undefined &&
    params.minted_to_date !== ""
  ) {
    getParams += `&minted_to_date=${params.minted_to_date}`;
  }
  if (
    params &&
    params.minted_start_date !== null &&
    params.minted_start_date !== undefined &&
    params.minted_start_date !== ""
  ) {
    getParams += `&minted_start_date=${params.minted_start_date}`;
  }
  if (
    params &&
    params.minted_end_date !== null &&
    params.minted_end_date !== undefined &&
    params.minted_end_date !== ""
  ) {
    getParams += `&minted_end_date=${params.minted_end_date}`;
  }
  if (
    params &&
    params.sold_from_date !== null &&
    params.sold_from_date !== undefined &&
    params.sold_from_date !== ""
  ) {
    getParams += `&sold_from_date=${params.sold_from_date}`;
  }
  if (
    params &&
    params.sold_to_date !== null &&
    params.sold_to_date !== undefined &&
    params.sold_to_date !== ""
  ) {
    getParams += `&sold_to_date=${params.sold_to_date}`;
  }
  if (
    params &&
    params.sold_start_date !== null &&
    params.sold_start_date !== undefined &&
    params.sold_start_date !== ""
  ) {
    getParams += `&sold_start_date=${params.sold_start_date}`;
  }
  if (
    params &&
    params.sold_end_date !== null &&
    params.sold_end_date !== undefined &&
    params.sold_end_date !== ""
  ) {
    getParams += `&sold_end_date=${params.sold_end_date}`;
  }
  return fetch(`${hostConfig?.API_URL}${requestUrl}${getParams}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => responseHandler(response))
    .then((data) => data)
    .catch((error) => {
      errorHandler(error);
    });
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

const getListWithoutToken = async (requestUrl: string, params?: any) => {
  const token = localStorage.getItem("accessToken");

  let getParams = "?";

  if (params && params.id && params.id !== undefined) {
    getParams += `id=${params.id}`;
  }
  if (params && params.page && params.page !== undefined) {
    getParams += `page=${params.page}`;
  }
  if (params && params.limit && params.limit !== undefined) {
    getParams += `&limit=${params.limit}`;
  }
  if (
    params &&
    params.search &&
    params.search !== undefined &&
    params.search !== null &&
    params.search !== ""
  ) {
    getParams += `&search=${params.search}`;
  }
  if (params && params.is_sold && params.is_sold !== undefined) {
    getParams += `&is_sold=${params.is_sold}`;
  }
  if (params && params.status && params.status !== undefined) {
    getParams += `&status=${params.status}`;
  }

  if (params && params.from_date && params.from_date !== undefined) {
    getParams += `&from_date=${params.from_date}`;
  }
  if (params && params.to_date && params.to_date !== undefined) {
    getParams += `&to_date=${params.to_date}`;
  }
  if (params && params.start_date && params.start_date !== undefined) {
    getParams += `&start_date=${params.start_date}`;
  }
  if (params && params.end_date && params.end_date !== undefined) {
    getParams += `&end_date=${params.end_date}`;
  }

  if (
    params &&
    params.format &&
    params.format !== null &&
    params.format !== undefined
  ) {
    getParams += `&format=${params.format}`;
  }
  if (
    params &&
    params.type &&
    params.type !== null &&
    params.type !== undefined
  ) {
    getParams += `&type=${params.type}`;
  }

  if (
    params &&
    params.year &&
    params.year !== null &&
    params.year !== undefined
  ) {
    getParams += `&year=${params.year}`;
  }
  if (
    params &&
    params.days &&
    params.days !== null &&
    params.days !== undefined
  ) {
    getParams += `&days=${params.days}`;
  }
  if (
    params &&
    params.subcategories &&
    params.subcategories !== null &&
    params.subcategories !== undefined
  ) {
    getParams += `&subcategories=${params.subcategories}`;
  }
  if (
    params &&
    params.category_type &&
    params.category_type !== null &&
    params.category_type !== undefined
  ) {
    getParams += `&category_type=${params.category_type}`;
  }
  if (
    params &&
    params.category_id &&
    params.category_id !== null &&
    params.category_id !== undefined
  ) {
    getParams += `&category_id=${params.category_id}`;
  }

  if (
    params &&
    params.list !== null &&
    params.list !== undefined &&
    params.list !== ""
  ) {
    getParams += `&list=${params.list}`;
  }
  if (
    params &&
    params.created_from_date !== null &&
    params.created_from_date !== undefined &&
    params.created_from_date !== ""
  ) {
    getParams += `&created_from_date=${params.created_from_date}`;
  }
  if (
    params &&
    params.created_to_date !== null &&
    params.created_to_date !== undefined &&
    params.created_to_date !== ""
  ) {
    getParams += `&created_to_date=${params.created_to_date}`;
  }

  return fetch(`${hostConfig?.API_URL}${requestUrl}${getParams}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  })
    .then((response) => responseHandler(response))
    .then((data) => data.json())
    .catch((error) => {
      errorHandler(error);
    });
};

const viewDataByApi = async (
  requestUrl: string,
  dataId?: any,
  params?: any,
) => {
  let getParams = `?`;
  if (params && params.limit && params.limit !== undefined) {
    getParams += `&limit=${params.limit}`;
  }
  if (params && params?.search !== null && params?.search !== undefined) {
    getParams += `&search=${params?.search}`;
  }
  if (params && params?.level !== null && params?.level !== undefined) {
    getParams += `&level=${params?.level}`;
  }
  if (params && params?.id !== null && params?.id !== undefined) {
    getParams += `id=${params?.id}`;
  }
  if (params && params.page && params.page !== undefined) {
    getParams += `&page=${params.page}`;
  }

  if (
    params &&
    params?.wallet_address !== null &&
    params?.wallet_address !== undefined
  ) {
    getParams += `wallet_address=${params?.wallet_address}`;
  }
  const token = await localStorage.getItem("accessToken");
  return fetch(`${hostConfig?.API_URL}${requestUrl}/${dataId}${getParams}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
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
const viewDataByApiWithoutToken = async (
  requestUrl: string,
  dataId?: any,
  params?: any,
) => {
  let getParams = `?`;
  if (params && params.limit && params.limit !== undefined) {
    getParams += `&limit=${params.limit}`;
  }
  if (params && params?.search !== null && params?.search !== undefined) {
    getParams += `&search=${params?.search}`;
  }
  if (params && params?.level !== null && params?.level !== undefined) {
    getParams += `&level=${params?.level}`;
  }
  if (params && params?.id !== null && params?.id !== undefined) {
    getParams += `id=${params?.id}`;
  }
  if (params && params.page && params.page !== undefined) {
    getParams += `&page=${params.page}`;
  }

  if (
    params &&
    params?.wallet_address !== null &&
    params?.wallet_address !== undefined
  ) {
    getParams += `wallet_address=${params?.wallet_address}`;
  }
  const token = await localStorage.getItem("accessToken");
  return fetch(`${hostConfig?.API_URL}${requestUrl}/${dataId}${getParams}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: "Bearer " + token,
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
const putDataApi = (requestUrl: string, data: any) => {
  const token = localStorage.getItem("accessToken");
  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: "PUT",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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
const putFormDataByIdApi = (requestUrl: string, id: any, params: any) => {
  const token = localStorage.getItem("accessToken");
  // console.log(params);
  return fetch(`${hostConfig.API_URL}${requestUrl}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: params,
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
const putFormDataById = (requestUrl: string, params: any) => {
  const token = localStorage.getItem("accessToken");
  // console.log(params);
  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: params,
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
const deleteBulkDataApi = async (requestUrl: string, dataIds: number[]) => {
  const token = await localStorage.getItem("accessToken");
  // Construct the query parameter string from the array of IDs
  const queryParams = dataIds.map((id) => `id=${id}`).join("&");

  return fetch(
    `${hostConfig?.API_URL}${requestUrl}/bulk-delete/?${queryParams}`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    },
  )
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
export {
  postDataApi,
  getListByApi,
  getListWithoutToken,
  viewDataByApi,
  viewDataByApiWithoutToken,
  getListByFileApi,
  deleteDataApiById,
  putDataByIdApi,
  deleteBulkDataApi,
  postFormDataApi,
  putFormDataByIdApi,
  putDataApi,
  putFormDataById
};
