import { useState } from 'react';
import { useBorrowBookMutation } from '../features/borrows/borrow.api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function BorrowForm() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;

    try {
      await borrowBook({ bookId, data: { quantity, dueDate } }).unwrap();
      toast.success('✅ Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (error: any) {
      toast.error(error?.data?.message || '❌ Borrow failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">📚 Borrow Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="quantity" className="block font-medium text-sm mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min={1}
            className="w-full px-4 py-2 border rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block font-medium text-sm mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="w-full px-4 py-2 border rounded-md"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full"
        >
          {isLoading ? 'Borrowing...' : 'Borrow Book'}
        </button>
      </form>
    </div>
  );
}
