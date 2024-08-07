import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity, ActivityFormValues } from "../../models/Activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import {  store } from "../stores/store";
import { User, UserFormValues } from "../../models/User";
import { Profile } from "../../models/Profile";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.request.use(config=>{
  const token=store.commonStore.token;
  if(token) config.headers.Authorization=`Bearer ${token}`;
  return config;
})
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status,config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if(config.method==='get'&& Object.prototype.hasOwnProperty.call(data.errors,'id'))
        router.navigate('/not-found');
        if(data.errors){
            const validationErrors=[];
            for(const key in data.errors){
             if(data.errors[key]) {  validationErrors.push(data.errors[key])}
            }
            throw validationErrors.flat();
        }else{
        toast.error("bad request");}
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 403:
        toast.error("forbiden");
        break;
      case 404:
        router.navigate('/not-found');
        break;
      case 500:
        store.commonStore.setError(data);
        router.navigate('/server-error');
        break;
      
    }
    return Promise.reject(error);
  }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  detail: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) => requests.post<void>("/activities", activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
  attend:(id:string)=>requests.post<void>(`/activities/${id}/attend`,{})
};
const Profiles={
  get:(username:string)=>requests.get<Profile>(`/Profiles/${username}`),
  uploadPhoto:(file:Blob)=>{
    let formData=new FormData();
    formData.append('File',file);
    return axios.post('photos',formData,{
      headers:{'Content-Type':'multipart/form-data'}
    })
  },
  setMainPhoto:(id:string)=>requests.post(`/photos/${id}/setMain`,{}),
  delPhoto:(id:string)=>requests.del(`/photos/${id}`),
}
const Account={
  current:()=>requests.get<User>("/account"),
  register:(user:UserFormValues)=>requests.post<User>("/account/register",user),
  login:(user:UserFormValues)=>requests.post<User>("/account/login",user),

}

const agent = {
  Activities,
  Account,
  Profiles
};
export default agent;
