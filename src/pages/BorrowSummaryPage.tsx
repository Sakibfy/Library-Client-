import { useGetBorrowSummaryQuery } from '../features/borrows/borrow.api';

export default function BorrowSummaryPage() {
  const { data: summary, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) return <p className="text-center mt-10">Loading summary...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">📊 Borrow Summary</h2>

      {summary && summary.length > 0 ? (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">📘 Title</th>
              <th className="px-4 py-2">📖 ISBN</th>
              <th className="px-4 py-2">🔢 Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.isbn}</td>
                <td className="px-4 py-2 font-semibold text-blue-700">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No borrow data available.</p>
      )}
    </div>
  );
}
