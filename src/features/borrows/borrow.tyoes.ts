export interface IBorrow {
  _id?: string;
  book: string; // book ID
  quantity: number;
  dueDate: string; // ISO string format (yyyy-mm-dd)
}

export interface IBorrowSummary {
  title: string;
  isbn: string;
  totalQuantity: number;
}
