import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateBuild } from "../../actions";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function EditBuildPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error, success } = await searchParams;
  const supabase = await createClient();

  const { data: build } = await supabase
    .from("car_builds")
    .select("*")
    .eq("id", id)
    .single();

  if (!build) {
    notFound();
  }

  const updateBuildWithId = updateBuild.bind(null, id);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/builds/${id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Build
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Edit Build</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Build updated successfully!
          </div>
        )}

        <form action={updateBuildWithId} method="POST" className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={build.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={build.description || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <Link
              href={`/builds/${id}`}
              className="flex-1 text-center border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
