import { customAxios } from "../configs"

export const serviceUtils = {
    getService: async () => {
        const {data} = await customAxios.get('api/service-type?all=true')
        return data
    },
    getServiceByiD: async (id: number) => {
        const {data} = await customAxios.get(`api/service-type/${id}`)
        return data
    },
    postService: async ({name}:{name: string}) => {
        const {data} = await customAxios.post('api/service-type', {
            name
        })
        return data
    },
    editService: async (name:string, id:number) => {
        const {data} = await customAxios.patch(`api/service-type/${id}`, {
            name
        })
        return data
    },
    deleteServise: async (id:number) => {
        const {data} = await customAxios.delete(`api/service-type/${id}`)
        return data
    }
}