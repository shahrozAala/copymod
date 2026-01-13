export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CarBuild = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: "draft" | "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
};

export type CarBuildInsert = Omit<CarBuild, "id" | "created_at" | "updated_at">;
