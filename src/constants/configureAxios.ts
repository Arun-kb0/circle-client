import { toast } from "react-toastify";
import { AppDispatch } from "../app/store";
import { axiosPrivate } from "./axiosInstance";
import { refresh } from "../features/auth/authApi";

const configureAxios = async (dispatch: AppDispatch, accessToken: string) => {

  const requestIntercept = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseIntercept = axiosPrivate.interceptors.response.use(
    response => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;

        // Dispatch the refresh action and wait for it to complete
        const resultAction = await dispatch(refresh());

        if (refresh.fulfilled.match(resultAction)) {
          const newAccessToken = resultAction.payload.accessToken;
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest); // Retry the original request
        }
      }
      return Promise.reject(error);
    }
  );

  return () => {
    axiosPrivate.interceptors.request.eject(requestIntercept);
    axiosPrivate.interceptors.response.eject(responseIntercept);
  };
}


export default configureAxios