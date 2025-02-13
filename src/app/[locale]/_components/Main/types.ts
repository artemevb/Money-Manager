// types.ts
export interface CardData {
  cardNumber: string;
  cardName?: string;
  balance: number;
}

export interface cardType {
  balance: number
  cardNumber: string
  cardType: string
  id: number
}
export interface serviseType {
  countTransaction: number
  id: number
  name: string
}