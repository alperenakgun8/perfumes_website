import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../app/store'
import { fetchNotes } from '../../thunks/noteThunks';
import NoteCard from '../NoteCard/NoteCard';
import './NoteList.css'

function NoteList() {

    const dispatch = useDispatch<AppDispatch>();

    const notes = useSelector((state: RootState) => state.note.notes);

    useEffect(() => {
        dispatch(fetchNotes());
    }, []);

  return (
    <div className='container-notes-list'>
        <h2>Notes List</h2>
        <div className='notes-list'>
        {
            notes.length === 0 ? (<p>No notes found</p>) : (
                notes.map((n) => (
                    <NoteCard key={n._id} name={n.name} image_url={n.image_url}/>
                ))
            )
        }
    </div>
    </div>
  )
}

export default NoteList