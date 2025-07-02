export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 border-t">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} LibraryApp. All rights reserved.
      </p>
      <p className="text-xs text-gray-400">Built with ❤️ using React, TypeScript & Tailwind CSS</p>
    </footer>
  );
}
