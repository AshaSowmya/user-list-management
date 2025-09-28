// // src/pages/UsersList.tsx
// 'use client';
// import { useEffect, useState, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllUsers } from '../redux/slices/user.slice.ts';
// import { AppDispatch, RootState } from '../redux/store.ts';
// import UserTable from '../components/common/UserTable.tsx';
// import UserCardGrid from '../components/common/UserCardGrid.tsx';
// import UserFormModal from '../components/common/UserFormModal.tsx';
// import { useUserModal } from '../hooks/useUserModal.ts';
// import { Table, LayoutGrid, Search } from "lucide-react";
// import ConfirmModal from '../components/common/ConfirmModal.tsx';
// import debounce from 'lodash/debounce';


// export default function UserList({ onCreate }: { onCreate: () => void }) {
//   const dispatch = useDispatch<AppDispatch>();
//   const [page, setPage] = useState(1);
//   const [view, setView] = useState<'table' | 'card'>('table');
//   const [searchTerm, setSearchTerm] = useState('');

//   // ✅ use custom hook here
//   const {
//     modalOpen,
//     modalMode,
//     selectedUser,
//     openCreateModal,
//     openEditModal,
//     deleteModalOpen,
//     userToDelete,
//     openDeleteModal,
//     closeDeleteModal,
//     confirmDelete,
//     closeModal,
//   } = useUserModal<any>();

//   const { users, totalPages, currentPage } = useSelector(
//     (state: RootState) => state.users
//   );

//   // ✅ Debounced fetch
//   const debouncedFetch = useCallback(
//     debounce((value: string, pageNum: number) => {
//       dispatch(fetchAllUsers({ page: pageNum, per_page: 5, search: value }));
//     }, 500),
//     [dispatch]
//   );

//   useEffect(() => {
//     debouncedFetch(searchTerm, page);
//   }, [searchTerm, page, debouncedFetch]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setPage(1); // reset to first page on new search
//   };

//   const data = Array.isArray(users) ? users : users || [];

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="bg-white p-6 rounded-md shadow">
//         {/* Top bar: title + search + create */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
//           <h2 className="text-lg font-semibold">Users</h2>

//           <div className="flex flex-1 sm:flex-none gap-2 items-center">
//             {/* Search input */}
//             <div className="relative flex-1 sm:w-64">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search users..."
//                 className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//               <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>

//             {/* Create User */}
//             <button
//               onClick={openCreateModal}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Create User
//             </button>
//           </div>
//         </div>

        
//         <div className="flex justify-between items-center mb-4">

//           <div className="space-x-2 flex">
//             <button
//               onClick={() => setView('table')}
//               className={`flex items-center gap-1 px-3 py-1 border rounded transition ${view === 'table'
//                 ? 'bg-white border-blue-500 text-blue-500'
//                 : 'hover:bg-gray-100'
//                 }`}
//             >
//               <Table className="w-4 h-4" />
//               Table
//             </button>

//             <button
//               onClick={() => setView('card')}
//               className={`flex items-center gap-1 px-3 py-1 border rounded transition ${view === 'card'
//                 ? 'bg-white border-blue-500 text-blue-500'
//                 : 'hover:bg-gray-100'
//                 }`}
//             >
//               <LayoutGrid className="w-4 h-4" />
//               Card
//             </button>
//           </div>

//         </div>

//         {view === 'table' ? (
//           <UserTable
//             data={data}
//             currentPage={currentPage || page}
//             totalPages={totalPages || 1}
//             onEdit={openEditModal}
//             onDelete={openDeleteModal}
//             onPageChange={setPage}
//           />
//         ) : (
//           <>
//             <UserCardGrid
//               data={data}
//               onEdit={openEditModal}
//               onDelete={openDeleteModal}
//             />
//             {/* Simple pagination below cards */}
//             <div className="flex justify-end mt-4 space-x-1">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 &lt;
//               </button>
//               {Array.from({ length: totalPages || 1 }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i + 1)}
//                   className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : ''
//                     }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 &gt;
//               </button>
//             </div>
//           </>
//         )}
//         <UserFormModal
//           open={modalOpen}
//           onClose={closeModal}
//           mode={modalMode}
//           initialValues={selectedUser}
//         />

//         <ConfirmModal
//           open={deleteModalOpen}
//           title="Delete User"
//           message={`Are you sure you want to delete "${userToDelete?.first_name} ${userToDelete?.last_name}"?`}
//           onCancel={closeDeleteModal}
//           onConfirm={confirmDelete}
//         />
//       </div>
//     </div>
//   );
// }



'use client';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/slices/user.slice.ts';
import { AppDispatch, RootState } from '../redux/store.ts';
import UserTable from '../components/common/UserTable.tsx';
import UserCardGrid from '../components/common/UserCardGrid.tsx';
import UserFormModal from '../components/common/UserFormModal.tsx';
import { useUserModal } from '../hooks/useUserModal.ts';
import { Table, LayoutGrid, Search } from 'lucide-react';
import ConfirmModal from '../components/common/ConfirmModal.tsx';
import debounce from 'lodash/debounce';

export default function UserList({ onCreate }: { onCreate: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'table' | 'card'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const perPage = 5;

  // ✅ Custom modal hook
  const {
    modalOpen,
    modalMode,
    selectedUser,
    openCreateModal,
    openEditModal,
    deleteModalOpen,
    userToDelete,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    closeModal,
  } = useUserModal<any>();

  const { users, totalPages: backendTotalPages } = useSelector((state: RootState) => state.users);

  // ✅ Fetch users from backend whenever page changes
  useEffect(() => {
    dispatch(fetchAllUsers({ page, per_page: perPage }));
  }, [dispatch, page]);

  // ✅ Debounced search input
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // ✅ Filter users locally (only the current page)
  const filteredUsers = users.filter(u =>
    u.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination handlers
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, backendTotalPages || 1));

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white p-6 rounded-md shadow">
        {/* Top bar: title + search + create */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h2 className="text-lg font-semibold">Users</h2>

          <div className="flex flex-1 sm:flex-none gap-2 items-center">
            {/* Search input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search users..."
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            {/* Create User */}
            <button
              onClick={openCreateModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create User
            </button>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-2 flex">
            <button
              onClick={() => setView('table')}
              className={`flex items-center gap-1 px-3 py-1 border rounded transition ${
                view === 'table' ? 'bg-white border-blue-500 text-blue-500' : 'hover:bg-gray-100'
              }`}
            >
              <Table className="w-4 h-4" />
              Table
            </button>

            <button
              onClick={() => setView('card')}
              className={`flex items-center gap-1 px-3 py-1 border rounded transition ${
                view === 'card' ? 'bg-white border-blue-500 text-blue-500' : 'hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Card
            </button>
          </div>
        </div>

        {/* Users */}
        {view === 'table' ? (
          <UserTable
            data={filteredUsers}
            currentPage={page}
            totalPages={backendTotalPages || 1}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onPageChange={setPage}
          />
        ) : (
          <>
            <UserCardGrid
              data={filteredUsers}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />

            {/* Pagination for card view */}
            <div className="flex justify-end mt-4 space-x-1">
              <button
                disabled={page === 1}
                onClick={handlePrev}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                &lt;
              </button>
              {Array.from({ length: backendTotalPages || 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === backendTotalPages}
                onClick={handleNext}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </>
        )}

        {/* Modals */}
        <UserFormModal open={modalOpen} onClose={closeModal} mode={modalMode} initialValues={selectedUser} />
        <ConfirmModal
          open={deleteModalOpen}
          title="Delete User"
          message={`Are you sure you want to delete "${userToDelete?.first_name} ${userToDelete?.last_name}"?`}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}
