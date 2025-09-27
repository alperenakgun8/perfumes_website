import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { fetchBrands, fetchSelectedPerfumes } from '../../features/perfumes/thunks/perfumeThunks';
import SearchPerfumeContent from '../components/SearchPerfumeContent';
import { fetchConcentrations } from '../../features/concentrations/thunks/concentrationThunks';

function SearchPerfumePage() {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchSelectedPerfumes());
        dispatch(fetchConcentrations());
        dispatch(fetchBrands());
    });

  return (
    <SearchPerfumeContent />
  )
}

export default SearchPerfumePage