import { customAxios } from "../configs"
interface Device {
    name: string;
    type: "IOS" | "Android" | "WEB"; 
    deviceId: string;
    firebaseToken: string;
  }
  
  interface LoginRequest {
    login: string;
    password: string;
    device: Device;
  }

export const AuthUtils = {
    createUser: async ({login, password,device}:LoginRequest) => {
        const {data} = await customAxios.post('api/auth/login',{
            login, password, device
        })
        console.log(data);
        localStorage.setItem('accessToken', data?.data?.token?.accessToken)
        localStorage.setItem('refreshToken', data?.data?.token?.refreshToken)
        localStorage.setItem('role', data?.data?.user?.role)
        return data
    }
}