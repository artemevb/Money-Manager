import { customAxios } from "../configs"

interface postCard {
    cardNumber: string,
    balance: number
}
interface editCard {
    cardNumber: string,
    balance: number,
    id: number
}

export const cardUtils = {
    getCard: async () => {
        const { data } = await customAxios.get('api/card/my-cards')
        return data
    },
    homeCard: async () => {
        const {data} = await customAxios.get('api/home')
        return data
    },
    postCard: async ({ balance, cardNumber }: postCard) => {
        const { data } = await customAxios.post('api/card', { balance, cardNumber })
        return data
    },
    editCard: async ({ balance, cardNumber, id }: editCard) => {
        const { data } = await customAxios.patch(`api/card/mark-main-card/${id}`, { balance, cardNumber })
        return data
    },
    deleteCard: async (id: number) => {
        const { data } = await customAxios.delete(`api/card/${id}`)
        return data
    }
}