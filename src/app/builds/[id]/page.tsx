import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BuildActions } from "@/components/builds/BuildActions";
import { StatusBadge } from "@/components/builds/StatusBadge";
import type { BuildStatus } from "../actions";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; status_updated?: string }>;
};

export default async function BuildDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error, status_updated } = await searchParams;
  const supabase = await createClient();

  const { data: build } = await supabase
    .from("car_builds")
    .select("*")
    .eq("id", id)
    .single();

  if (!build) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/builds" className="text-blue-600 hover:underline text-sm">
            Back to Builds
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {status_updated && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Status updated successfully!
          </div>
        )}

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{build.title}</h1>
            <StatusBadge status={build.status as BuildStatus} />
          </div>
          <BuildActions
            buildId={build.id}
            currentStatus={build.status as BuildStatus}
          />
        </div>

        {build.description && (
          <p className="text-gray-600 mb-6">{build.description}</p>
        )}

        <div className="border-t pt-6">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Created</dt>
              <dd className="font-medium">
                {new Date(build.created_at).toLocaleDateString()}
              </dd>
            </div>
            {build.updated_at && (
              <div>
                <dt className="text-gray-500">Last Updated</dt>
                <dd className="font-medium">
                  {new Date(build.updated_at).toLocaleDateString()}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </main>
  );
}
