
import { useGetBookByIdQuery, useUpdateBookMutation } from '../features/books/book.api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const EditBookForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookByIdQuery(bookId || '');
  const [updateBook] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  });

  useEffect(() => {
    if (data?.data) {
      setFormData(data.data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'copies' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id: bookId, updatedData: formData }).unwrap();
      toast.success('✅ Book updated successfully!');
      navigate('/books');
    } catch (err) {
      toast.error('❌ Failed to update book');
    }
  };

  if (isLoading) return <p className="text-center">Loading book info...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load book data</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          placeholder="Author"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          placeholder="Genre"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          placeholder="ISBN"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="copies"
          value={formData.copies}
          placeholder="Copies"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min={0}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
