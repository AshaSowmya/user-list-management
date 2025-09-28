'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { deleteUserById, fetchAllUsers } from '../../redux/slices/user.slice.ts';
import ConfirmModal from './ConfirmModal.tsx';

interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Props {
  data: User[];
  currentPage: number;
  totalPages: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onPageChange: (page: number) => void;
}

export default function UserTable({
  data,
  currentPage,
  totalPages,
  onEdit,
  onDelete,
  onPageChange,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      await dispatch(deleteUserById(selectedUser.id));
    }
    setConfirmOpen(false);
    setSelectedUser(null);
  };
  return (
    <div >
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4"> </th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </td>
                <td className="py-3 px-4 text-blue-600 hover:underline">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="py-3 px-4">{user.first_name}</td>
                <td className="py-3 px-4">{user.last_name}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/*  Delete Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete User"
        message={`Are you sure you want to delete "${selectedUser?.first_name} ${selectedUser?.last_name}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      
      {/* Card view for small screens */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data?.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg shadow-sm p-4 flex items-center gap-3"
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-blue-600 font-medium hover:underline">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              <p className="text-sm">
                {user.first_name} {user.last_name}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-sm rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-sm rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
