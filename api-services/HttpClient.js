import axios from "axios";
export let API = axios.create({
  baseURL: `https://upayments-studycase-api.herokuapp.com/api`,
});

export async function getApi(endPoint, headers = null, query = null) {
  const response = await API.get(`${endPoint}`, {
    headers: headers,
    params: query,
  });
  return response;
}
export async function postApi(endPoint, body = null, headers = null) {
  const response = await API.post(`${endPoint}`, body, {
    headers: headers,
  });

  return response;
}
