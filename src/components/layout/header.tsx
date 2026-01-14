import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          CopyMod
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/builds"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Builds
          </Link>
          <Link
            href="/builds/new"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Build
          </Link>
        </nav>
      </div>
    </header>
  );
}
