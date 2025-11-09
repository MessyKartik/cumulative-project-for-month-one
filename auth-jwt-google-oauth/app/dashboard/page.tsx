"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (status === "loading") return;

    // Show session data if logged in with Google
    if (session) {
      console.log("Google OAuth Session:", session);
      console.log("Access Token:", (session as any).accessToken);
      console.log("Custom JWT:", (session as any).customJWT);
    }
  }, [session, status]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          {status === "loading" && <p className="text-gray-600">Loading...</p>}

          {session && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="font-semibold text-green-800 mb-2">
                  ✅ Logged in with Google OAuth
                </h2>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Name:</strong> {session.user?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {session.user?.email}
                  </p>
                  <p>
                    <strong>User ID:</strong> {(session.user as any).id}
                  </p>
                </div>
              </div>

              {(session as any).customJWT && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h2 className="font-semibold text-blue-800 mb-2">
                    🔑 Custom JWT Token
                  </h2>
                  <div className="text-xs font-mono break-all bg-white text-black p-3 rounded border">
                    {(session as any).customJWT}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Check browser console for more details
                  </p>
                </div>
              )}

              {(session as any).accessToken && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h2 className="font-semibold text-purple-800 mb-2">
                    🔐 Google Access Token
                  </h2>
                  <div className="text-xs font-mono break-all text-black bg-white p-3 rounded border">
                    {(session as any).accessToken}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Use this token to access Google APIs
                  </p>
                </div>
              )}
            </div>
          )}

          {!session && status !== "loading" && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You are not logged in</p>
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Test Protected Endpoint
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Test the JWT protected endpoint with Postman:
          </p>
          <div className="bg-gray-50 text-black p-4 rounded-lg">
            <code className="text-xs">
              GET http://localhost:3000/api/auth/me
              <br />
              Authorization: Bearer YOUR_JWT_TOKEN
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
