import { supabase } from "./supabaseClient";

export async function getAllProducts() {
  const { data: products, error } = await supabase.from("products").select("*");
  if (error) {
    return [];
  } else {
    return products;
  }
}

export async function getAllWishlistProducts() {
  const { data: wishlist, error } = await supabase.from("wishlist").select(`
    id,
    products (*)
  `);
  if (error) {
    return [];
  } else {
    return wishlist;
  }
}

export async function addToWishlist(args) {
  const { data: added, error } = await supabase.from("wishlist").insert([args]);
  if (error) {
    return [];
  } else {
    return added;
  }
}

export async function removeFromWishlist(args) {
  const { data: removed, error } = await supabase
    .from("wishlist")
    .delete()
    .match(args);
  if (error) {
    return [];
  } else {
    return removed;
  }
}
