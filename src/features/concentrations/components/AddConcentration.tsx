import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import type { Concentration } from '../api/types';
import { addNewConcentration } from '../thunks/concentrationThunks';

import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@mui/material';

function AddConcentration() {
  const dispatch = useDispatch<AppDispatch>();

  const [newName, setNewName] = useState<string>("");
  const [newDisplayName, setNewDisplayName] = useState<string>("");

  const handleAddConcentration = () => {
    const newConcentration: Concentration = {
      name: newName,
      display_name: newDisplayName,
    };
    dispatch(addNewConcentration(newConcentration));
    setNewName("");
    setNewDisplayName("");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add New Concentration
        </Typography>
        <Grid container spacing={2}>
          <Grid size = {{ xs:12 }}>
            <TextField
              fullWidth
              label="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Grid>
          <Grid size = {{ xs:12 }}>
            <TextField
              fullWidth
              label="Display Name"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="success" onClick={handleAddConcentration}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddConcentration;
