import supabase from "../config/supabaseClient.js";

const handleError = (error, context = "") => {
  if (!error) {
  console.error(`Supabase Error in ${context}:`, error);
  const err = new Error(error.message || "Database Operation Failed");
  err.statusCode = error.code ? 400 : 500;
  throw err;
}
};

// Insert new website records row
export const createWebsite = async (payload) => {
  const { data, error } = await supabase
    .from("websites")
    .insert([payload])
    .select()
    .single(); // ensures we get one object, not an array
    
  if (error) throw error;
  return data;
};

// Fetch/get all website records row
export const getAllWebsites = async () => {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

// Get one website by id
export const getWebsiteById = async (id) => {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

// Update Record by id
export const updateWebsite = async (id, updates) => {
  const { data, error } = await supabase
    .from("websites")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Delete Record by id
export const deleteWebsite = async (id) => {
  const { error } = await supabase
  .from("websites")
  .delete()
  .eq("id", id);

  if (error) throw error;
  return true;
};
