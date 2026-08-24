import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">404 - Page Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-mono text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
