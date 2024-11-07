import "./card.css";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

interface CardProps {
    id: number
    value: string
    type: string
    onDelete: (id: number) => void;
    onUpdate: (id: number, type: string, value: string) => void;
}

export function Card({ id, type, value, onDelete, onUpdate } : CardProps){
    
    return(
        <div className="card">
            <h2>{type}</h2>
            <p><b>Valor:</b>{value}</p>
            <button onClick={() => onDelete(id)} className="delete-button">
                <FaTrash /> {/* Ícone de lixeira */}
            </button>
            <button onClick={() => onUpdate(id, type, value)} className="update-button">
                <FaPencilAlt /> {/* Ícone de lápis */}
            </button>

        </div>
    )
}