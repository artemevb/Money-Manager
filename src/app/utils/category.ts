import { customAxios } from "../configs"

export const categoryUtils = {
    getCategory: async () => {
        const {data} = await customAxios.get('api/category')
        return data
    },
    postCategory: async ({name}:{name:string}) => {
        const {data} = await customAxios.post('api/category', {
            name
        })
        return data
    }
}