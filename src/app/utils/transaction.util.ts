import { incomeTrancaptionType, transactionType } from "../[locale]/_components/Main/types"
import { customAxios } from "../configs"

export const transactionUtils = {
    getTransaction: async () => {
        const {data} = await customAxios.get('api/transaction')
        return data 
    },
    postIncome: async ({ comment, files, fromClientId, incomeStatus, transactionDetails, serviceTypeId, toCardId, transactionDate, transactionType }: incomeTrancaptionType) => {
        const formData = new FormData();
    
        formData.append('comment', comment);
        if(files){
            formData.append('files', files);  
        }
        formData.append('fromClientId', fromClientId.toString());
        formData.append('incomeStatus', incomeStatus);
        formData.append('serviceTypeId', serviceTypeId.toString());
        formData.append('toCardId', toCardId.toString());
        formData.append('transactionDate', transactionDate);
        formData.append('transactionType', transactionType);    
        formData.append('transactionDetails', JSON.stringify(transactionDetails)); 
    
        const { data } = await customAxios.post('api/transaction', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Content-Typeni belgilash
            },
        });
    
        return data;
    },
    postMoving: async ({amount,comment,files,fromClientId,moneyType,toCardId,transactionType}: transactionType) => {
        const {data} = await customAxios.post('api/transaction', {
            amount, comment, files, fromClientId,  moneyType, toCardId,  transactionType,
        },{
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        return data
    },
}