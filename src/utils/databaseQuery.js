import { supabase } from "./supabaseClient";

export async function getAllProducts() {
  const { data: products, error } = await supabase.from("products").select("*");
  if (error) {
    return [];
  } else {
    return products;
  }
}
