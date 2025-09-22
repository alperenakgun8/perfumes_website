import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { fetchNotes } from '../../features/notes/thunks/noteThunks';
import SearchByNoteBox from '../../features/notes/components/SearchByNoteBox';

function SearchByNotesPage() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <SearchByNoteBox />
  )
}

export default SearchByNotesPage