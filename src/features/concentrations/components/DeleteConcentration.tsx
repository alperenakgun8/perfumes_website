import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { deleteExistingConcentration } from "../thunks/concentrationThunks";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  OutlinedInput,
} from "@mui/material";

function DeleteConcentration() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState<string>("");

  const concentrations = useSelector(
    (state: RootState) => state.concentration.concentrations
  );

  const dropDownOptions = concentrations
    .filter((c): c is (typeof c) & { _id: string } => !!c._id)
    .map((c) => ({
      value: c._id,
      label: `${c.name} - ${c.display_name}`,
    }));

  const handleDeleteConcentration = () => {
    if (selectedId) {
      dispatch(deleteExistingConcentration(selectedId));
      setSelectedId("");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Delete Concentration
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs:12 }}>
            <FormControl fullWidth>
              <InputLabel id="concentration-select-label">Concentration</InputLabel>
              <Select
                labelId="concentration-select-label"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                input={<OutlinedInput label="Concentration" />}
              >
                {dropDownOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteConcentration}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeleteConcentration;
