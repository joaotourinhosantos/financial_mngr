import { useState } from "react";

import "./modal.css"

interface UpdateModalProps {
  transferData: { id: number, type: string, value: string };
  closeModal(): void;
  onUpdate(id: number, type: string, value: string): void;
}

export function UpdateModal({ transferData, closeModal, onUpdate }: UpdateModalProps) {
  const [type, setType] = useState(transferData.type);
  const [value, setValue] = useState(transferData.value);

  const handleSubmit = () => {
    onUpdate(transferData.id, type, value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>ATUALIZAR TRANSFERÊNCIA</h2>
        <form className="input-container">
          <label>Tipo</label>
          <input value={type} onChange={(e) => setType(e.target.value)} />
          <label>Valor</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
        <button onClick={handleSubmit} className="btn-secondary">
            ATUALIZAR
        </button>
            
        <button onClick={closeModal} className="btn-secondary">CANCELAR</button>
      </div>
    </div>
  );
}
