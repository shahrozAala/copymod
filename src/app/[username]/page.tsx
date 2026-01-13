import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ username: string }>;
};

function extractUsername(rawUsername: string): string | null {
  if (rawUsername.startsWith("%40")) {
    return rawUsername.slice(3);
  }
  if (rawUsername.startsWith("@")) {
    return rawUsername.slice(1);
  }
  return null;
}

export default async function ProfilePage({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = extractUsername(rawUsername);

  if (!username) {
    notFound();
  }

  const supabase = await createClient();
  const { data: builds } = await supabase
    .from("car_builds")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">@{username}</h1>
        <p className="text-gray-600 mb-8">Profile page for {username}</p>

        <div>
          <h2 className="text-xl font-semibold mb-4">Builds</h2>
          {builds && builds.length > 0 ? (
            <div className="grid gap-4">
              {builds.map((build) => (
                <Link
                  key={build.id}
                  href={`/builds/${build.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{build.title}</h3>
                      {build.description && (
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {build.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                      {build.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No builds yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
