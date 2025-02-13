import { transactionType } from "../[locale]/_components/Main/types"
import { customAxios } from "../configs"

export const transactionUtils = {
    getTransaction: async () => {
        const {data} = await customAxios.get('api/transaction')
        return data 
    },
    postTransaction: async ({amount,comment,files,fromCardId,fromClientId,incomeStatus,moneyType,serviceTypeId,toCardId,transactionDate,transactionType,toCategoryConsumptionId}: transactionType) => {
        const {data} = await customAxios.post('api/transaction', {
            amount, comment, files, fromCardId, fromClientId, incomeStatus, moneyType, serviceTypeId, toCardId, transactionDate, transactionType,toCategoryConsumptionId
        })
        return data
    }
}