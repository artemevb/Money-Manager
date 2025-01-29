// types.ts
export interface CardData {
  number: string;
  cardName?: string;
  amount: number;
}

export interface Transaction {
  date: string;
  amount: string;
  status: 'Одобрено' | 'Отменено';
}