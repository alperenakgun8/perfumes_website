import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../app/store';
import { fetchConcentrations } from '../../thunks/concentrationThunks';
import './ConcentrationList.css'

const ConcentrationList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux store'dan concentrations array'ini alıyoruz
  const concentrations = useSelector((state: RootState) => state.concentration.concentrations);

  useEffect(() => {
    dispatch(fetchConcentrations());
  }, []);

  return (
    <div className='concentrations-list'>
      <h2>Concentrations List</h2>
      {concentrations.length === 0 ? (
        <p>No concentrations found</p>
      ) : (
        <ul>
          {concentrations.map((c) => (
            <li key={c._id}>
              {c.name} - {c.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConcentrationList;
