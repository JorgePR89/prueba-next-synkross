import { supabase } from "../lib/supabaseClient";
import { ListPaginated, User } from "../types/userModel";

export async function getAllUsers(pag:number): Promise<ListPaginated | null> {
  const maxPag = 10;
  const currentPage = pag;
  try {
    let { data: users, error } = await supabase.from('users').select('id, name, email').order('id', { ascending: true });
    if (users && users.length > 0) {
      const finalIndex = currentPage * maxPag;
      const initIndex = finalIndex < maxPag ? 0 : finalIndex - maxPag;
      let response = {
        items: users.slice(initIndex, finalIndex),
        pages: users.length > maxPag ? Math.ceil(users.length / maxPag) : 1,
        currentPage: currentPage,
        itemsPage: maxPag,
        totalItems: users.length
      }
      return response;
    }
    return null;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function updateUser(user: User) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ name: user.name, email: user.email })
      .eq('id', user.id);
    if (error){
      throw new Error(error.message);
    }else{
      return data;
    }
  } catch {
    throw new Error();
  }
}
