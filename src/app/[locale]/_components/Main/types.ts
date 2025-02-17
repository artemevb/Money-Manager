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
  id: number,
  moneyType:string
}
export interface serviseType {
  countTransaction: number
  id: number
  name: string
}
export interface transactionExpensesType{
  transactionType: "CONSUMPTION"
  fromCardId: number,
  toCategoryConsumptionId: number
  files: File
  transactionDate: string | "",
  comment: string,
  transactionDetails: trasactionDetales[]
}
interface trasactionDetales{
  moneyType: string,
  amount: number
}
export interface incomeTrancaptionType{
  transactionType: string
  transactionDetails: trasactionDetales[]
  transactionDate: string,
  comment: string,
  files?: File  | null
  serviceTypeId: number,
  incomeStatus: string
  toCardId: number,
  fromClientId: number,
}

export interface clietnType{
  firstName: string,
  lastName: string,
  fatherName: string,
  phone: string,
  status: "ACTUAL",
  serviceTypeId: number
}
export interface transactionTypeOnsubmit {
  type: string;
  transactionType: string;
  transactionDetails: trasactionDetales[]
  serviceTypeId: number;
  transactionDate: string;
  incomeStatus: string;
  comment: string;
  files: File[] | null;
  fromClientId?: number;
  toCardId?: number;
  fromCardId?: number;
}