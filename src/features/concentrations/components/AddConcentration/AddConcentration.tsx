import TextInput from '../../../../shared/components/TextInput/TextInput'
import Button from '../../../../shared/components/Button/Button'
import { addNewConcentration } from '../../thunks/concentrationThunks';
import './AddConcentration.css'
import { useState } from 'react'
import type { Concentration } from '../../slices/concentrationSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../app/store';

function AddConcentration() {

  const dispatch = useDispatch<AppDispatch>();

  const [newName, setNewName] = useState<string>("");
  const [newDisplayName, setNewDisplayName] = useState<string>("");

  const handleAddConcentration = () => {
    const newConcentration: Concentration = {
      name: newName,
      display_name: newDisplayName
    }
    dispatch(addNewConcentration(newConcentration));
    setNewName("");
    setNewDisplayName("");
  }

  return (
    <div className='add-concentration'>
        <TextInput 
          variant='primary'
          placeholder='Name'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        
        <TextInput 
          variant='primary'
          placeholder='Display Name'
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />

        <Button 
          name='Add'
          size='medium'
          variant='secondary'
          onClick={handleAddConcentration}
        />
    </div>
  )
}

export default AddConcentration