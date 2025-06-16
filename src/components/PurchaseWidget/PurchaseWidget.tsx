import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

import PurchaseModal from './PurchaseModal';

const PurchaseWidget: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed top-1/2 right-8 z-50 -translate-y-1/2 transform">
        <button
          onClick={handleOpenModal}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-xl"
          aria-label="상품 구매하기"
        >
          <ShoppingCartOutlined className="text-2xl text-white" />
        </button>
      </div>

      <PurchaseModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default PurchaseWidget;
