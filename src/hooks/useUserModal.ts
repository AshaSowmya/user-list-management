// src/hooks/useUserModal.ts
'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteUserById, fetchAllUsers } from '../redux/slices/user.slice.ts';

type ModalMode = 'create' | 'edit';

export function useUserModal<T>() {
  const dispatch = useDispatch<AppDispatch>();

  //  Form modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedUser, setSelectedUser] = useState<T | null>(null);

  //  Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<T | null>(null);

  // --- Form modal handlers ---
  const openCreateModal = () => {
    setSelectedUser(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const openEditModal = (user: T) => {
    setSelectedUser(user);
    setModalMode('edit');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // --- Delete modal handlers ---
  const openDeleteModal = (user: T) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    await dispatch(deleteUserById((userToDelete as any).id));
    closeDeleteModal();

  };

  return {
    // Form modal
    modalOpen,
    modalMode,
    selectedUser,
    openCreateModal,
    openEditModal,
    closeModal,

    // Delete modal
    deleteModalOpen,
    userToDelete,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}
