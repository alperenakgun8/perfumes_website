import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { fetchNotes } from '../../features/notes/thunks/noteThunks';
import SearchByNoteContent from '../../features/notes/components/SearchByNoteContent';
import { fetchSelectedPerfumes } from '../../features/perfumes/thunks/perfumeThunks';

function SearchByNotesPage() {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchSelectedPerfumes());
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <SearchByNoteContent />
  )
}

export default SearchByNotesPage