import DropDown from "../../../../shared/components/DropDown/DropDown"
import Button from "../../../../shared/components/Button/Button"
import './DeleteNote.css'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import type { AppDispatch, RootState } from "../../../../app/store"
import { deleteExistingNote } from "../../thunks/noteThunks"

function DeleteNote() {

    const dispatch = useDispatch<AppDispatch>();

     const [selectedId, setSelectedId] = useState<string>("");
    const notes = useSelector((state: RootState) => state.note.notes);

    const dropDownOptions = notes.filter((c): c is (typeof c) & {_id: string} => !!c._id). map(c => ({
        value: c._id,
        label: c.name
    }));

    const handleDeleteNote = () => {
        dispatch(deleteExistingNote(selectedId));
    }

  return (
    <div className="delete-note">
        <DropDown
            size="medium"
            options={dropDownOptions}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            variant="primary"
        />
        <Button
            name="Delete"
            size="medium"
            variant="danger"
            onClick={handleDeleteNote}
        />
    </div>
  )
}

export default DeleteNote