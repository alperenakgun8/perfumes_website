import { usePerfumeForm } from "../hooks/usePerfumeForm";
import PerfumeCard from "./PerfumeCard";
import { Card, CardContent, Typography, Grid} from '@mui/material';
function PerfumeList() {

    const { perfumes } = usePerfumeForm();
    
  return (
    <Card sx={{ margin: '2rem auto', padding: 2, boxShadow: 3 }}>
        <CardContent>
            <Typography justifySelf="center" variant="h5" gutterBottom>
            Perfumes List
        </Typography>

        {
            perfumes.length === 0 ? (
                <Typography color="text.secondary">No perfumes found</Typography>
            ) : (
                <Grid container spacing={1} justifyContent="center">
                    {
                        perfumes.map((p) => (
                            <Grid key={p._id}>
                                <PerfumeCard _id={p._id || ""} brand={p.brand} name={p.name} image_url={p.image_url}/>
                            </Grid>
                        ))
                    }
                </Grid>
            )
        }
        </CardContent>
    </Card>
  )
}

export default PerfumeList