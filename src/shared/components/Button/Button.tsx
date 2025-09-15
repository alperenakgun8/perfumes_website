import React from 'react';
import './Button.css'

interface ButtonProps {
    name: string;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "danger"
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ name, size="medium", variant="primary", disabled = false, onClick }: ButtonProps) { 
    
  return (
    <div className ={`app-button ${size} ${variant}`} >
        <button disabled = {disabled} onClick={onClick}>{name}</button>
    </div>
  )
}

export default Button