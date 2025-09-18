import AddPerfume from "../features/perfumes/components/AddPerfume";
import PerfumeList from "../features/perfumes/components/PerfumeList";
import DeletePerfume from "../features/perfumes/components/DeletePerfume";
import UpdatePerfume from "../features/perfumes/components/UpdatePerfume";

import { 
  Card,
  CardContent,
  Grid
 } from "@mui/material";

function PerfumeManagementPage() {
  return (
    <Card sx={{ maxWidth: '100%', margin: "2rem auto", padding: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{xs: 12}}>
            <PerfumeList/>
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <AddPerfume/>
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <UpdatePerfume/>
          </Grid>
          <Grid size={{xs:12, sm:12}}>
            <DeletePerfume/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PerfumeManagementPage