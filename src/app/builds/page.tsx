import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BuildActions } from "@/components/builds/BuildActions";
import { StatusBadge } from "@/components/builds/StatusBadge";
import type { BuildStatus } from "./actions";

type Props = {
  searchParams: Promise<{ created?: string; deleted?: string; status_updated?: string }>;
};

export default async function BuildsPage({ searchParams }: Props) {
  const { created, deleted, status_updated } = await searchParams;
  const supabase = await createClient();

  const { data: builds } = await supabase
    .from("car_builds")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Builds</h1>
          <Link
            href="/builds/new"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            New Build
          </Link>
        </div>

        {created && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Build created successfully!
          </div>
        )}

        {deleted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Build deleted successfully!
          </div>
        )}

        {builds && builds.length > 0 ? (
          <div className="grid gap-4">
            {builds.map((build) => (
              <div
                key={build.id}
                className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/builds/${build.id}`}
                        className="text-xl font-semibold hover:text-blue-600 transition-colors truncate"
                      >
                        {build.title}
                      </Link>
                      <StatusBadge status={build.status as BuildStatus} />
                    </div>
                    {build.description && (
                      <p className="text-gray-600 line-clamp-2">
                        {build.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-400 mt-2">
                      Created {new Date(build.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <BuildActions
                    buildId={build.id}
                    currentStatus={build.status as BuildStatus}
                    showView
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No builds yet.{" "}
            <Link href="/builds/new" className="text-blue-600 hover:underline">
              Create your first build
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
