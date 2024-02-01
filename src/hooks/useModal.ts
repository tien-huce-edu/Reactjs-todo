import React, { useState } from 'react';
import { ModalType, Todo } from 'src/types/type';

const useModal = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Todo | null>(null);

  const openModal = (type: ModalType, data?: Todo) => {
    setModalType(type);
    setIsModalOpen(true);
    if ((type === 'Edit' || type === 'Delete') && data) {
      setModalData(data);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
    setModalData(null);
  };

  return {
    modalData,
    isModalOpen,
    modalType,
    openModal,
    closeModal,
  };
};

export default useModal;
