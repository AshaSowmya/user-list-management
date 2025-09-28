'use client';
import { Pencil, Trash2 } from "lucide-react"; 

interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Props {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserCardGrid({ data, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((user) => (
        <div
          key={user.id}
          className="relative group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <div className="flex flex-col items-center p-6">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <p className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          <div className="
            absolute inset-0 bg-gray-800/70 
            flex flex-col items-center justify-center gap-4
            opacity-0 group-hover:opacity-100
            transition-opacity
          ">
            <div className="flex gap-6">
              <button
                onClick={() => onEdit(user)}
                className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition"
              >
                <Pencil className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => onDelete(user)}
                className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
