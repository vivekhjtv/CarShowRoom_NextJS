'use client';

import { useState, useMemo, useEffect } from 'react';
import Modal from '../ui/user/Model';

interface User {
  _id: string;
  username: string;
  email: string;
  password?: string; // Make password optional
  role: string;
}

export default function Page() {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const rowsLimit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const totalPage = Math.ceil(userList.length / rowsLimit);

  const rowsToShow = useMemo(() => {
    const startIndex = currentPage * rowsLimit;
    return userList.slice(startIndex, startIndex + rowsLimit);
  }, [userList, currentPage]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/register');
        if (!response.ok) {
          throw new Error('Failed to fetch car data');
        }
        const data = await response.json();

        setUserList(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const addUser = (user: User) => {
    setUserList((prevList) => [
      ...prevList,
      { ...user, id: prevList.length + 1 },
    ]);
    console.log(userList);
  };

  const editUserHandler = (updatedUser: User) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    console.log(updatedUser);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/register/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete users');
      }

      setUserList((prevList) => prevList.filter((user) => user._id !== id));

      console.log(`Deleted product with ID ${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage - 1));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Error: {error}
        </h1>
      </main>
    );
  }

  return (
    <div className="h-full bg-white flex items-center justify-center pt-14 pb-14">
      <div className="w-full max-w-6xl px-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium">User Management</h1>
          <button
            onClick={() => {
              setEditUser(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add User
          </button>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Username
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Email
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Role
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    {user.role}
                  </td>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => handleEditUser(user)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          <div className="text-lg">
            Showing {currentPage * rowsLimit + 1} to{' '}
            {Math.min((currentPage + 1) * rowsLimit, userList.length)} of{' '}
            {userList.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === 0
                    ? 'bg-[#cccccc] pointer-events-none'
                    : 'cursor-pointer'
                }`}
                onClick={previousPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
              </li>
              {Array.from({ length: totalPage }, (_, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage === index
                      ? 'text-blue-600 border-sky-500'
                      : 'border-[#E4E4EB] '
                  }`}
                  onClick={() => setCurrentPage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === totalPage - 1
                    ? 'bg-[#cccccc] pointer-events-none'
                    : 'cursor-pointer'
                }`}
                onClick={nextPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onAddItem={addUser}
          onEditItem={editUserHandler}
          user={editUser || undefined}
        />
      )}
    </div>
  );
}
