import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { useEffect } from 'react';
import { fetchConcentrations } from '../../features/concentrations/thunks/concentrationThunks';

import ConcentrationList from '../../features/concentrations/components/ConcentrationList';
import AddConcentration from '../../features/concentrations/components/AddConcentration';
import UpdateConcentration from '../../features/concentrations/components/UpdateConcentration';
import DeleteConcentration from '../../features/concentrations/components/DeleteConcentration';

import { 
  CardContent,
  Grid,
  Box
} from '@mui/material';

function ConcentrationManagementPage() {

  const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
      dispatch(fetchConcentrations());
    }, [dispatch]);

  return (
    <Box sx={{ maxWidth: '100%', margin: "1rem auto", padding: 2, backgroundColor: "transparent" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <ConcentrationList />
          </Grid>
          <Grid size={{xs:12, sm:6, md: 4}}>
            <AddConcentration />
          </Grid>
          <Grid size={{xs:12, sm:6, md: 4}}>
            <UpdateConcentration />
          </Grid>
          <Grid size={{xs:12, sm:6, md: 4}}>
            <DeleteConcentration />
          </Grid>
        </Grid>
      </CardContent>
    </Box>
  );
}

export default ConcentrationManagementPage;
