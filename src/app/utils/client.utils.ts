import { clietnType } from "../[locale]/_components/Main/types"
import { customAxios } from "../configs"


export const clientUtils = {
    getClientAll: async () => {
        const {data} = await customAxios.get('api/client')
        return data
    },
    getClientId: async ({id}:{id:number}) => {
        const {data} = await customAxios.get(`api/client/${id}`)
        return data
    },
    editClient: async ({id,fatherName,firstName,lastName,phone,serviceTypeId,status}:clietnType) => {
        const {data} = await customAxios.put(`api/client/${id}`, {
            fatherName,firstName,lastName,phone,serviceTypeId,status
        })
        return data
    },
    postClient: async ({fatherName,firstName,lastName,phone,serviceTypeId,status}:clietnType) => {
        const {data} = await customAxios.post('api/client', {
            fatherName,firstName,lastName,phone,serviceTypeId,status
        })
        return data
    },
    deleteClient: async ({id}:{id:number}) => {
        const {data} = await customAxios.delete(`api/client/${id}`)
        return data
    } 
}