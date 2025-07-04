export interface IBorrow {
  _id?: string;
  book: string; 
  quantity: number;
  dueDate: string; 
}

export interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
