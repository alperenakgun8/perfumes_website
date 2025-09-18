import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { deleteExistingPerfume } from "../thunks/perfumeThunks";

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
  OutlinedInput,
  Button,
} from "@mui/material";

function DeletePerfume() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState<string>("");

  const perfumes = useSelector((state: RootState) => state.perfume.perfumes);

  const dropDownOptions = perfumes
    .filter((p): p is (typeof p) & { _id: string } => !!p._id)
    .map((p) => ({
      value: p._id,
      label: `${p.brand} - ${p.name}`,
    }));

  const handleDeletePerfume = () => {
    if (selectedId) {
      dispatch(deleteExistingPerfume(selectedId));
      setSelectedId("");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Delete Perfume
        </Typography>
        <Grid container spacing={2}>
          <Grid size = {{xs: 12}}>
            <FormControl fullWidth>
              <InputLabel id="perfume-select-label">Select Perfume</InputLabel>
              <Select
                labelId="perfume-select-label"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                input={<OutlinedInput label="Select Perfume" />}
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
        <Button variant="contained" color="error" onClick={handleDeletePerfume}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeletePerfume;
