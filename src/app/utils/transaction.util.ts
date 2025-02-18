import { incomeTrancaptionType, transactionExpensesType } from "../[locale]/_components/Main/types"
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
    postMoving: async ({comment,files,transactionType,fromCardId,transactionDate,transactionDetails,toCategoryConsumptionId}: transactionExpensesType) => {
        const formData = new FormData();
    
        if(files?.length){
            files.forEach(file => (
                formData.append('files', file)
            ))
        }
        formData.append('comment', comment);
        formData.append('fromCardId', fromCardId.toString());
        formData.append('toCategoryConsumptionId', toCategoryConsumptionId.toString());
        formData.append('transactionDate', transactionDate);
        formData.append('transactionType', transactionType);    
        formData.append('transactionDetails', JSON.stringify(transactionDetails)); 

        const {data} = await customAxios.post('api/transaction', formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        })
        return data
    },
}