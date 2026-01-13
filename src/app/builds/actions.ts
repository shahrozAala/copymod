"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBuild(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title?.trim()) {
    redirect("/builds/new?error=title_required");
  }

  const { error } = await supabase.from("car_builds").insert({
    user_id: null,
    title: title.trim(),
    description: description?.trim() || null,
    status: "draft",
  });

  if (error) {
    redirect(`/builds/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/builds");
  redirect("/builds?created=true");
}

export async function updateBuild(id: string, formData: FormData): Promise<void> {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title?.trim()) {
    redirect(`/builds/${id}/edit?error=Title is required`);
  }

  const { error } = await supabase
    .from("car_builds")
    .update({
      title: title.trim(),
      description: description?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(`/builds/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/builds/${id}`);
  revalidatePath("/builds");
  redirect(`/builds/${id}/edit?success=true`);
}

export async function deleteBuild(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("car_builds").delete().eq("id", id);

  if (error) {
    redirect(`/builds/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/builds");
  redirect("/builds?deleted=true");
}
