import { userType } from "../[locale]/_components/Main/types"
import { customAxios } from "../configs"

export const userUtils = {
    getUserAll: async () => {
        const {data} = await customAxios.get("api/user?all=true")
        return data
    },
    getUserById: async ({id}:{id:number}) => {
        const {data} = await customAxios.get(`api/user/${id}`)
        return data
    },
    getUserAccaunt: async () => {
        const {data} = await customAxios.get("api/user/account")
        return data
    },
    postUser: async ({email,fatherName,firstName,lastName,newLogin,newPassword,oldLogin,oldPassword,password,role}:userType) => {
        const {data} = await customAxios.post('api/user',
            {email,fatherName,firstName,lastName,newLogin,newPassword,oldLogin,oldPassword,password,role},
            {headers: {
                'Content-Type': 'multipart/form-data', 
            }}
        )
        return data
    },
    editUserAccaunt: async ({email,fatherName,firstName,lastName,newLogin,newPassword,oldLogin,oldPassword,password,role}:userType) => {
        const {data} = await customAxios.put('api/user',
            {email,fatherName,firstName,lastName,newLogin,newPassword,oldLogin,oldPassword,password,role},
            {headers: {
                'Content-Type': 'multipart/form-data', 
            }}
        )
        return data
    }
}