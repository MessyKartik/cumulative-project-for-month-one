import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Auth System
        </h1>
        <p className="text-center text-gray-600 mb-8">
          JWT + Google OAuth Authentication
        </p>
        
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Login
          </Link>
          
          <Link
            href="/signup"
            className="block w-full bg-gray-600 text-white text-center py-3 rounded-lg hover:bg-gray-700 transition font-medium"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold text-gray-700 mb-2">Features:</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Email/Password Authentication</li>
            <li>✅ Google OAuth Login</li>
            <li>✅ JWT Token Generation</li>
            <li>✅ Protected Routes</li>
            <li>✅ Webhook Listener</li>
          </ul>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Test with Postman or use the UI</p>
        </div>
      </div>
    </div>
  );
}