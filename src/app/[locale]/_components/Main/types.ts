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
export interface transactionType{
  transactionType: "MOVING" | "CONSUMPTION" | "INCOME"
  moneyType: string,
  amount: number,
  transactionDate: string,
  comment: string,
  files: File
  serviceTypeId: number,
  incomeStatus: "PREPAYMENT" | "PLANNED" | "POSTPAY" | "FINZAYM"
  fromClientId: number,
  toCardId: number,
  fromCardId: number,
  toCategoryConsumptionId?: number
}

export interface clietnType{
  firstName: string,
  lastName: string,
  fatherName: string,
  phone: string,
  status: "ACTUAL",
  serviceTypeId: number
}