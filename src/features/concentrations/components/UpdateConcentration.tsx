import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { updateExistingConcentration } from "../thunks/concentrationThunks";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from "@mui/material";

function UpdateConcentration() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedId, setSelectedId] = useState<string>("");
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState<string>("");

  const concentrations = useSelector(
    (state: RootState) => state.concentration.concentrations
  );

  const dropDownOptions = concentrations
    .filter((c): c is (typeof c) & { _id: string } => !!c._id)
    .map((c) => ({
      value: c._id,
      label: `${c.name} - ${c.display_name}`,
    }));

  const handleUpdateConcentration = () => {
    if (!selectedId) return;

    const updatedConcentration = {
      _id: selectedId,
      name: updatedName,
      display_name: updatedDisplayName,
    };

    dispatch(updateExistingConcentration(updatedConcentration));

    setUpdatedName("");
    setUpdatedDisplayName("");
    setSelectedId("");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Concentration
        </Typography>
        <Grid container spacing={2}>
          <Grid size = {{xs:12}}>
            <FormControl fullWidth>
              <InputLabel id="concentration-select-label">Select Concentration</InputLabel>
              <Select
                labelId="concentration-select-label"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                input={<OutlinedInput label="Select Concentration" />}
              >
                {dropDownOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size = {{xs:12}}>
            <TextField
              fullWidth
              label="Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </Grid>

          <Grid size = {{xs:12}}>
            <TextField
              fullWidth
              label="Display Name"
              value={updatedDisplayName}
              onChange={(e) => setUpdatedDisplayName(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="primary" onClick={handleUpdateConcentration}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
}

export default UpdateConcentration;
