"use client";

import { User } from "./types/userModel";
import { useEffect, useState } from "react";
import { getAllUsers } from "./services/supabaseService";

function Home() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    getAllUsers();
  });

  /* const fetchAllUsers = async (city: string) => {
    const res = await getAllUsers();
    setUsers(res);
  }; */

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ul>
        {/* {users.map((user: User) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default Home;
