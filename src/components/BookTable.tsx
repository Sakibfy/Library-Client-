import { useNavigate } from 'react-router';
import { useGetBooksQuery, useDeleteBookMutation } from '../features/books/book.api';

import toast from 'react-hot-toast';

const BookTable = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  console.log(data);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap();
        toast.success('Book deleted!');
      } catch (err) {
        toast.error('Failed to delete book');
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading books...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load books</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">📚 All Books</h2>
      <table className="min-w-full border border-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
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
          {data?.data?.map((book: any) => (
            <tr key={book._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.author}</td>
              <td className="px-4 py-2">{book.genre}</td>
              <td className="px-4 py-2">{book.isbn}</td>
              <td className="px-4 py-2">{book.copies}</td>
              <td className="px-4 py-2">
                {book.copies > 0 ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/borrow/${book._id}`)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
