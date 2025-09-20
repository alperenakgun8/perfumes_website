import { useConcentrationForm } from '../hooks/useConcentrationForm';
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
  
  const { name, setName, displayName, setDisplayName, handleAdd } = useConcentrationForm();

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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid size = {{ xs:12 }}>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="success" onClick={handleAdd}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddConcentration;
