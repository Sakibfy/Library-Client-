import { useGetBorrowSummaryQuery } from "@/features/borrows/borrow.api";
import type { IBorrowSummary } from "@/features/borrows/borrow.tyoes";


const BorrowSummaryPage = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) return <p className="text-center text-blue-600">Loading borrow summary...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load borrow summary</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Borrow Summary</h2>

      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">Book Title</th>
            <th className="px-4 py-2">ISBN</th>
            <th className="px-4 py-2">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
  {data?.data?.map((summaryItem: IBorrowSummary) => (
    <tr key={summaryItem.book.isbn} className="border-b hover:bg-gray-50">
      <td className="px-4 py-2">{summaryItem.book.title}</td>
      <td className="px-4 py-2">{summaryItem.book.isbn}</td>
      <td className="px-4 py-2 font-semibold">{summaryItem.totalQuantity}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default BorrowSummaryPage;
