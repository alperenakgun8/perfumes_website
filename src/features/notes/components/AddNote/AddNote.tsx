import './AddNote.css';
import TextInput from '../../../../shared/components/TextInput/TextInput';
import Button from '../../../../shared/components/Button/Button';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import type { AppDispatch } from '../../../../app/store';
import type { Note } from '../../api/types';
import { addNewNote } from '../../thunks/noteThunks';

function AddNote() {

    const dispatch = useDispatch<AppDispatch>();

    const [newName, setNewName] = useState<string>("");
    const [newImageUrl, setNewImageUrl] = useState<string>("");

    const handleAddNote = () => {
        const newNote: Note = {
            name: newName,
            image_url: newImageUrl
        }
        dispatch(addNewNote(newNote));
        setNewName("");
        setNewImageUrl("");
    }

  return (
    <div className='add-note'>
        <TextInput
            variant='primary'
            placeholder='Name'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
        />
        <TextInput
            variant='primary'
            placeholder='Image URL'
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <Button
            name='Add'
            size='medium'
            variant='secondary'
            onClick={handleAddNote}
        />
    </div>
  )
}

export default AddNote