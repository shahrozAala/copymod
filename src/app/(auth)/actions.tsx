"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const username = formData.get("username") as string;
  const displayName = formData.get("displayName") as string;

  if (password !== confirmPassword) {
       return { error: "Passwords do not match" };
  }  
  
  const { data: existingUser } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username.toLowerCase())
    .single();

  if (existingUser) {
    return { error: "Username already taken" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username: username.toLowerCase(),
      display_name: displayName,
    });

    if (profileError) {
      return { error: "Failed to create profile" };
    }
  }

  redirect("/");
}
