import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const request = async ({ ...options }) => {
  client.interceptors.request.use((request) => {
    request.headers[
      "Authorization"
    ] = `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    request.headers["x-app-token"] = process.env.NEXT_PUBLIC_X_APP_TOKEN;
    return request;
  });
  const onSuccess = (response) => response;
  const onError = (error) => {
    // optionaly catch errors and add additional logging here
    return error;
  };
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
