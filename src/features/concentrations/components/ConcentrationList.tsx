import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchConcentrations } from '../thunks/concentrationThunks';

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const ConcentrationList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const concentrations = useSelector(
    (state: RootState) => state.concentration.concentrations
  );

  useEffect(() => {
    dispatch(fetchConcentrations());
  }, [dispatch]);

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Concentrations List
        </Typography>

        {concentrations.length === 0 ? (
          <Typography>No concentrations found</Typography>
        ) : (
          <List>
            {concentrations.map((c, index) => (
              <React.Fragment key={c._id}>
                <ListItem>
                  <ListItemText primary={`${c.name} - ${c.display_name}`} />
                </ListItem>
                {index < concentrations.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default ConcentrationList;
