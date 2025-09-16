import './UpdateNote.css';
import TextInput from '../../../../shared/components/TextInput/TextInput';
import Button from '../../../../shared/components/Button/Button';
import DropDown from '../../../../shared/components/DropDown/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import type { AppDispatch, RootState } from '../../../../app/store';
import { updateExistingNote } from '../../thunks/noteThunks';

function UpdateNote() {
    
    const dispatch = useDispatch<AppDispatch>();

    const [selectedId, setSelectedId] = useState<string>("");
    const [updatedName, setUpdatedName] = useState<string>("");
    const [updatedImageUrl, setUpdatedImageUrl] = useState<string>("");

    const notes = useSelector((state: RootState) => state.note.notes);
    
    const dropDownOptions = notes.filter((c): c is (typeof c) & {_id: string} => !!c._id).map(c => ({
        value: c._id,
        label: c.name
    }));

    const handleUpdateNote = () => {
        const updatedNote = {
            _id: selectedId,
            name: updatedName,
            image_url: updatedImageUrl
        }
        dispatch(updateExistingNote(updatedNote));

        setUpdatedImageUrl("");
        setUpdatedName("");
        setSelectedId("");
    }

  return (
    <div className='update-note'>
        <DropDown
            size='medium'
            options={dropDownOptions}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            variant='primary'
        />
        <TextInput
            variant='primary'
            placeholder='Name'
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
        />
        <TextInput
            variant='primary'
            placeholder='Image URL'
            value={updatedImageUrl}
            onChange={(e) => setUpdatedImageUrl(e.target.value)}
        />
        <Button
            name='Update'
            variant='primary'
            size='medium'
            onClick={handleUpdateNote}
        />
    </div>
  )
}

export default UpdateNote