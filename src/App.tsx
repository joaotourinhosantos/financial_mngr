import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useTransferData } from './hooks/useTransferData';
import { CreateModal } from './components/create-modal/create-modal';
import { UpdateModal } from './components/update-modal/update-modal';
import { useDeleteTransfer } from './hooks/useDeleteTransferData';
import { useUpdateTransfer } from './hooks/useUpdateTransferData';

function App() {
  const { data } = useTransferData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteTransfer } = useDeleteTransfer();
  const { mutate: updateTransfer } = useUpdateTransfer();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editTransfer, setEditTransfer] = useState<{ id: number, type: string, value: string } | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleDelete = (id: number) => {
    deleteTransfer(id); 
  };

  const handleOpenUpdateModal = (id: number, type: string, value: string) => {
    setEditTransfer({ id, type, value });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (id: number, type: string, value: string) => {
    updateTransfer({ id, type, value });
    setIsUpdateModalOpen(false);
  };

  return (
    <div className='container'>
      <h1>TRANSFERÊNCIAS</h1>
      <div className="card-grid">
        {data?.map(transferData => 
          <Card
            key={transferData.id}
            id={transferData.id!}
            value={transferData.value} 
            type={transferData.type}
            onDelete={handleDelete}
            onUpdate={handleOpenUpdateModal}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      {isUpdateModalOpen && editTransfer && (
        <UpdateModal
          transferData={editTransfer}
          closeModal={() => setIsUpdateModalOpen(false)}
          onUpdate={handleUpdateSubmit}
        />
      )}
      <button onClick={handleOpenModal} className='button-registrar'>REGISTRAR TRANSFERÊNCIA</button>
    </div>
  );
}

export default App;
