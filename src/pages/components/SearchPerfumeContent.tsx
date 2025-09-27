import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import PerfumeCard from '../../features/perfumes/components/PerfumeCard';
import { 
    Card,
    CardContent,
    Grid,
    Autocomplete,
    TextField,
    Checkbox,
    Chip,
    Button
 } from "@mui/material";
import type { Concentration } from '../../features/concentrations/api/types';
import { fetchPerfumesByFilter } from '../../features/perfumes/thunks/perfumeThunks';

function SearchPerfumeContent() {

    const dispatch = useDispatch<AppDispatch>();

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedConcentrations, setSelectedConcentrations] = useState<Concentration[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
    const [searchText, setSeatchText] = useState("");

    const selectedPerfumes = useSelector((state: RootState) => state.perfume.selectedPerfumes);
    const brands = useSelector((state: RootState) => state.perfume.brands);
    const concentrations = useSelector((state: RootState) => state.concentration.concentrations);
    const genders = ["Kadın", "Erkek", "Unisex"];

    const filteredPerfumes = selectedPerfumes.filter((p) =>
        `${p.brand} ${p.name}`.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleFilter = () => {

        let concentrations: string[] = [];

         selectedConcentrations.map(c => {
            if(c._id) concentrations.push(c._id);
         })
        
        const body = {
            brands: selectedBrands,
            genders: selectedGenders,
            concentrations: concentrations
        }
        dispatch(fetchPerfumesByFilter(body));
    }

  return (
     <>
        <Card sx={{minWidth:"90vw", margin: "2rem auto", padding: 2, boxShadow: 3}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, md: 4, lg: 4}}>
                        <TextField
                            fullWidth
                            label="Parfüm Ara"
                            placeholder='Arama..'
                            value={searchText}
                            onChange={(e) => setSeatchText(e.target.value)}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 4, lg: 3 }}>
                        <Autocomplete
                            multiple
                            options={brands}
                            getOptionLabel={(option) => option}
                            value={selectedBrands}
                            onChange={(event, newValue) => setSelectedBrands(newValue)}
                            disableCloseOnSelect
                            renderOption={(props, option, {selected}) => {
                                const {key, ...otherProps} = props;
                                return (
                                    <li key={option} {...otherProps}>
                                        <Checkbox style={{marginRight: 8}} checked={selected}/>
                                        {option}
                                    </li>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Marka" placeholder="Arama..."/>
                            )}
                            renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => (
                                <Chip label={option} {...getTagProps({ index })}/>
                            ))}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 4, lg: 2 }}>
                        <Autocomplete
                            multiple
                            options={concentrations}
                            getOptionLabel={(option) => option.name}
                            value={selectedConcentrations}
                            onChange={(event, newValue) => setSelectedConcentrations(newValue)}
                            disableCloseOnSelect
                            renderOption={(props, option, {selected}) => {
                                const {key, ...otherProps} = props;
                                return (
                                    <li key={option._id} {...otherProps}>
                                        <Checkbox style={{marginRight: 8}} checked={selected}/>
                                        {option.name}
                                    </li>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField {...params} 
                                    label="Konsantrasyon"
                                    placeholder='Arama...'
                                />
                            )}
                            renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => (
                                <Chip label={option.name} {...getTagProps({ index })}/>
                            ))}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 4, lg: 2 }}>
                        <Autocomplete
                            multiple
                            options={genders}
                            getOptionLabel={(option) => option}
                            value={selectedGenders}
                            onChange={(event, newValue) => setSelectedGenders(newValue)}
                            disableCloseOnSelect
                            renderOption={(props, option, {selected}) => {
                                const {key, ...otherProps} = props;
                                return (
                                    <li key={option} {...otherProps}>
                                        <Checkbox style={{marginRight: 8}} checked={selected}/>
                                        {option}
                                    </li>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Cinsiyet" placeholder="Arama..."/>
                            )}
                            renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => (
                                <Chip label={option} {...getTagProps({ index })}/>
                            ))}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 12, lg: 1}} sx={{ display: "flex", alignItems: "center" }}>
                        <Button onClick={handleFilter} variant="contained" color='error'>
                            Filtrele
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

      <Card sx={{maxWidth: "100%", marginTop:"1rem"}}>
        <CardContent>
          {

            filteredPerfumes.length !== 0 && (
                <Grid container spacing={1} justifyContent="center">
                    {
                        filteredPerfumes.map((p) => (
                            <Grid key={p._id}>
                                <PerfumeCard _id={p._id} brand={p.brand} name={p.name} image_url={p.image_url}/>
                            </Grid>
                        ))
                    }
                </Grid>
            )

            //   selectedPerfumes.length !== 0 && (
            //       <Grid container spacing={1} justifyContent="center">
            //           {
            //               selectedPerfumes.map((p) => (
            //                   <Grid key={p._id}>
            //                       <PerfumeCard _id={p._id} brand={p.brand} name={p.name} image_url={p.image_url}/>
            //                   </Grid>
            //               ))
            //           }
            //       </Grid>
            //   )
          }
        </CardContent>
      </Card>
     </>
    )
}

export default SearchPerfumeContent