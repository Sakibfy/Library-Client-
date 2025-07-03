import BookTable from "@/components/BookTable";


/**
 * BooksPage
 * ----------------------------------------
 * Route: /books
 * Description: Displays the full list of books in a table.
 */
export default function BooksPage() {
  return (
    <section className="min-h-screen px-4 py-6">
      <BookTable />
    </section>
  );
}

