import { incomeTrancaptionType, transactionType } from "../[locale]/_components/Main/types"
import { customAxios } from "../configs"

export const transactionUtils = {
    getTransaction: async () => {
        const {data} = await customAxios.get('api/transaction')
        return data 
    },
    postIncome: async ({amount,comment,files,fromClientId,incomeStatus,moneyType,serviceTypeId,toCardId,transactionDate,transactionType}: incomeTrancaptionType) => {
        const {data} = await customAxios.post('api/transaction', {
            amount, comment, files, fromClientId, incomeStatus, moneyType, serviceTypeId, toCardId, transactionDate, transactionType,
        })
        return data
    },
    postMoving: async ({amount,comment,files,fromClientId,moneyType,toCardId,transactionType}: transactionType) => {
        const {data} = await customAxios.post('api/transaction', {
            amount, comment, files, fromClientId,  moneyType, toCardId,  transactionType,
        })
        return data
    },
}