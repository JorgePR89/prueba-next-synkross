import { supabase } from "../lib/supabaseClient";

export async function getAllUsers() {
  console.log("holiiii");
  try {
    let { data: users, error } = await supabase.from('users').select('*');
    console.log(users);
    console.log(error);
    if (users) {
      if (users && Object.keys(users).length > 0) {
        return users;
      }
      return null;
    }
    throw new Error(error?.message);
  } catch (error) {
    throw new Error(error as string);
  }
}
