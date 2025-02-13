import { customAxios } from "../configs"

export const transactionUtils = {
    getTransaction: async () => {
        const {data} = await customAxios.get('api/transaction')
        return data 
    },
    postTransaction: async () => {
        const {data} = await customAxios.post('api/transaction')
        return data
    }
}