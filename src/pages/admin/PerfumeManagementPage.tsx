import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { useEffect } from "react";

import { fetchPerfumes } from "../../features/perfumes/thunks/perfumeThunks";
import { fetchNotes } from "../../features/notes/thunks/noteThunks";
import { fetchConcentrations } from "../../features/concentrations/thunks/concentrationThunks";

import AddPerfume from "../../features/perfumes/components/AddPerfume";
import PerfumeList from "../../features/perfumes/components/PerfumeList";
import DeletePerfume from "../../features/perfumes/components/DeletePerfume";
import UpdatePerfume from "../../features/perfumes/components/UpdatePerfume";

import { 
  Card,
  CardContent,
  Grid
 } from "@mui/material";

function PerfumeManagementPage() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPerfumes());
    dispatch(fetchNotes());
    dispatch(fetchConcentrations());
  }, [dispatch]);

  return (
    <Card sx={{ maxWidth: '100%', margin: "2rem auto", padding: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{xs: 12}}>
            <PerfumeList/>
          </Grid>
          <Grid size={{sm:12, md: 6}}>
            <AddPerfume/>
          </Grid>
          <Grid size={{sm:12, md: 6}}>
            <UpdatePerfume/>
          </Grid>
          <Grid size={{xs:12}}>
            <DeletePerfume/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PerfumeManagementPage