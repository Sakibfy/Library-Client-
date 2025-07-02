import { Link } from 'react-router-dom';
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from '../features/books/book.api';
import toast from 'react-hot-toast';

export default function BookTable() {
  const { data: books, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap();
        toast.success('Book deleted successfully');
      } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to delete book');
      }
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">📚 All Books</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">ISBN</th>
              <th className="px-4 py-2">Copies</th>
              <th className="px-4 py-2">Available</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book._id} className="border-t hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.isbn}</td>
                <td className="px-4 py-2">{book.copies}</td>
                <td className="px-4 py-2">
                  {book.available ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/borrow/${book._id}`}
                    className={`bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 ${
                      !book.available && 'opacity-50 pointer-events-none'
                    }`}
                  >
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
            {books?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


