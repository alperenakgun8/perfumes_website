import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import type { RootState } from "../../../app/store";
import { useEffect } from "react";
import { fetchPerfumes } from "../thunks/perfumeThunks";
import PerfumeCard from "./PerfumeCard";
import { Card, CardContent, Typography, Grid} from '@mui/material';

function PerfumeList() {

    const dispatch = useDispatch<AppDispatch>();

    const perfumes = useSelector((state: RootState) => state.perfume.perfumes);
    
    useEffect(() => {
        dispatch(fetchPerfumes());
    }, [dispatch]);

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: 2, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="h5" gutterBottom>
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
                                <PerfumeCard brand={p.brand} name={p.name} image_url={p.image_url}/>
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