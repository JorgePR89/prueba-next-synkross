"use client";
import React from 'react';
import { ListPaginated, User } from "./types/userModel";
import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "./services/supabaseService";
import './styles/homePage.css';

function Home() {
  const [list, setList] = useState<ListPaginated | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchAllUsers();
  },[]);

  const fetchAllUsers = async (pag?: number) => {
    const listPaginated = await getAllUsers(pag ? pag : 1);
    if (listPaginated) setList(listPaginated as ListPaginated);
  };

  const selectOtherPag = async (pag: number) => {
    setCurrentPage(pag)
    fetchAllUsers(pag);
  }

  const editUserInfo = async (user: User) => {
    updateUser(user).then(() => {
      fetchAllUsers(currentPage)
    });
  }

  const paginationFormat = ():number[] | undefined => {
    let totalPages: number[] = [];
    if (list){
      for (let i = 1; i <= list?.pages; i++) {
        totalPages.push(i)
      }
      return totalPages
    }
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className='pb-20'>SYNKROSS USER LIST</h2>
      <ul className='items-center justify-items-center grid gap-8'>
      {list?.items?.map((user: User) => {
        return (
          <li key={user.id} 
              className='rounded-xl p-5 pr-20 pl-20 flex outline-grey-900 gap-8'
          >
            <input type="text" placeholder={user.name} onChange={(e)=> user.name = e.target.value}></input>
            <input type="text" placeholder={user.email} onChange={(e)=> user.email = e.target.value}></input>
            <button className='editButton rounded-md p-2 pl-5 pr-5 bg-green-600' onClick={() => editUserInfo(user)}>Edit</button>
          </li>
        )
      })}
      </ul>
      <div className="mt-15 mb-15">
        <a className='m-3' href="#" onClick={() => selectOtherPag(currentPage-1)}>&laquo;</a>
        {paginationFormat()?.map((pag: number) => {
          return (
            <a className={ pag === currentPage ? "currentPage":"otherPages"} href="#" key={pag} onClick={() => selectOtherPag(pag)}>
              {pag}
            </a>
          )
        })}
        <a className='m-3' href="#" onClick={() => selectOtherPag(currentPage+1)}>&raquo;</a>
      </div>
    </div>
  );
}

export default Home;
