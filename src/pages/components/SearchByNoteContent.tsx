import { useSelector } from "react-redux";
import { useNoteForm } from "../../features/notes/hooks/useNoteForm";
import { 
    CardContent,
    Grid,
    Autocomplete,
    TextField,
    Checkbox,
    InputAdornment,
    IconButton,
    Box
 } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import type { RootState } from "../../app/store";
import PerfumeCard from "../../features/perfumes/components/PerfumeCard";

function SearchByNoteContent() {

    const selectedPerfumes = useSelector((state: RootState) => state.perfume.selectedPerfumes || []);
    const { selectedOptions, setSelectedOptions, dropDownOptions, handleSearch } = useNoteForm();

  return (
   <>
    <Box marginTop="2rem" display="flex" alignItems="center" justifyContent="center" sx={{backgroundColor: "transparent"}}>
        <Box sx={{padding: "1rem", width: {sm: "600px"}, minWidth: "300px", backgroundColor: "transparent"}}>
        <Grid container spacing={1}>
          <Grid size={{xs:12}} sx={{backgroundColor: "#C6E3AC"}}>
            <Autocomplete
                multiple
                fullWidth
                options={dropDownOptions}
                getOptionLabel={(option) => option.label}
                value={dropDownOptions.filter(opt => selectedOptions.map(s => s.value).includes(opt.value))}
                onChange={(_, newValue) => {
                    const uniqueValuesMap = new Map(newValue.map(item => [item.value, item]));
                    setSelectedOptions(Array.from(uniqueValuesMap.values()));
                }}
                disableCloseOnSelect
                renderOption={(props, option, {selected}
                ) => {
                    const {key, ...otherProps} = props;
                    return (
                        <li key={option.value} {...otherProps}>
                            <Checkbox style={{marginRight: 8}} checked={selected}/>
                            {option.label}
                        </li>
                    )
                }}
                renderInput={(params) => <TextField {...params} 
                label="Nota filtresi..." 
                placeholder="Seçiniz..." 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch();
                    }
                }}
                InputProps={{
                    ...params.InputProps,
                    endAdornment:(
                        <>
                            {params.InputProps?.endAdornment}
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleSearch()}>
                                    <FaSearch />
                                </IconButton>
                            </InputAdornment>
                        </>
                    )
                }}
                />}
            />
          </Grid>
        </Grid>
    </Box>
    </Box>
    
    <Box sx={{maxWidth: "100%", marginTop:"1rem", backgroundColor: "transparent", border: "none"}}>
      
      <CardContent>
        {
            selectedPerfumes.length !== 0 && (
                <Grid container spacing={1} justifyContent="center">
                    {
                        selectedPerfumes.map((p) => (
                            <Grid key={p._id}>
                                <PerfumeCard _id={p._id} brand={p.brand} name={p.name} image_url={p.image_url}/>
                            </Grid>
                        ))
                    }
                </Grid>
            )
        }
      </CardContent>
    </Box>
   </>
  )
}

export default SearchByNoteContent