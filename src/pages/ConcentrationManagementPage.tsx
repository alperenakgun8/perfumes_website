import ConcentrationList from '../features/concentrations/components/ConcentrationList';
import AddConcentration from '../features/concentrations/components/AddConcentration';
import UpdateConcentration from '../features/concentrations/components/UpdateConcentration';
import DeleteConcentration from '../features/concentrations/components/DeleteConcentration';

import { 
  Card,
  CardContent,
  Grid
} from '@mui/material';

function ConcentrationManagementPage() {
  return (
    <Card sx={{ maxWidth: '100%', margin: "2rem auto", padding: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <ConcentrationList />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <AddConcentration />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <UpdateConcentration />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <DeleteConcentration />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ConcentrationManagementPage;
