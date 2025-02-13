import { clietnType } from "../[locale]/_components/Main/types"
import { customAxios } from "../configs"


export const clientUtils = {
    getClientAll: async () => {
        const {data} = await customAxios.get('api/client')
        return data
    },
    postClient: async ({fatherName,firstName,lastName,phone,serviceTypeId,status}:clietnType) => {
        const {data} = await customAxios.post('api/client', {
            fatherName,firstName,lastName,phone,serviceTypeId,status
        })
        return data
    }
}