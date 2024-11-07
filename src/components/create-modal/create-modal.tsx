import { useEffect, useState } from "react"
import { useTransferDataMutate } from "../../hooks/useTranferDataMutade";
import { TransferData } from "../../interface/TransferData";

import "./modal.css"

interface InputProps {
    label: string,
    value: string,
    updateValue(value: any): void 
}

interface ModalProps {
    closeModal(): void
}

const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <> 
        <label>{label}</label>
        <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>    
    )
}    

export function CreateModal({closeModal}: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("0");
    const { mutate, isSuccess, status } = useTransferDataMutate();

    const submit = () => {
        const transferData: TransferData = {
            type: title,
            value: price 
        }

        mutate(transferData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal()
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>CADASTRE UMA TRANSFERÊNCIA</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                </form>
                <button onClick={submit} className="btn-secondary"> 
                    {status === 'pending' ? 'REGISTRANDO...' : 'REGISTRAR'}
                </button>
                <button onClick={closeModal} className="btn-secondary"> 
                    CANCELAR
                </button>
            </div>
        </div>
    )
}
