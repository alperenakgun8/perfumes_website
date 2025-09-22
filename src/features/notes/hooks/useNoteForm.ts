import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../app/store"
import { useState } from "react";
import type { Note } from "../api/types";
import { addNewNote, deleteExistingNote, updateExistingNote } from "../thunks/noteThunks";
import { fetchPerfumesByNotes } from "../../perfumes/thunks/perfumeThunks";

export function useNoteForm () {

    const dispatch = useDispatch<AppDispatch>();

    const [selectedOptions, setSelectedOptions] = useState<{value: string; label: string}[]>([]);
    const [selectedOption, setSelectedOption] = useState<{value: string; label: string;}>({label: "", value: ""});
    const [name, setName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const notes = useSelector((state: RootState) => state.note.notes);

  const dropDownOptions = notes
    .filter((n): n is (typeof n) & { _id: string } => !!n._id)
    .map((n) => ({
      value: n._id,
      label: n.name,
    })).sort((a,b) => a.label.localeCompare(b.label, "tr", {sensitivity: "accent"}));

    const reset = () => {
        setName("");
        setImageUrl("");
        setSelectedOption({label: "", value: ""});
    }

    const handleAdd = () => {
        const newNote: Note = {
            name: name,
            image_url: imageUrl
        };
        dispatch(addNewNote(newNote));
        reset();
    }

    const handleUpdate = () => {
        if(!selectedOption) return;
        const updatedNote: Note & {_id: string} = {
            _id: selectedOption.value,
            name: name,
            image_url: imageUrl
        }
        dispatch(updateExistingNote(updatedNote));
        reset();
    }

    const handleDelete = () => {
        if(!selectedOption) return;
        dispatch(deleteExistingNote(selectedOption.value));
        reset();
    }
    
    const handleSearch = () => {
        if(!selectedOptions) return;
        const noteIds = selectedOptions.map(option => option.value);
        dispatch(fetchPerfumesByNotes(noteIds));
    }

    return {
        notes,
        name,
        setName,
        imageUrl,
        setImageUrl,
        selectedOption,
        setSelectedOption,
        selectedOptions,
        setSelectedOptions,
        dropDownOptions,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleSearch
    }
}