import { useSelector } from "react-redux";
import { useNoteForm } from "../hooks/useNoteForm";
import { 
    Card,
    CardContent,
    Grid,
    Autocomplete,
    TextField,
    Checkbox,
    InputAdornment,
    IconButton
 } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import type { RootState } from "../../../app/store";
import PerfumeCard from "../../perfumes/components/PerfumeCard";

function SearchByNoteBox() {

    let selectedPerfumes = useSelector((state: RootState) => state.perfume.selectedPerfumes || []); 
    const { selectedOptions, setSelectedOptions, dropDownOptions, handleSearch } = useNoteForm();

  return (
   <>
    <Card sx={{margin: "2rem auto", padding: "0.5rem", width: "600px"}}>
        <Grid container spacing={1}>
          <Grid size={{xs:12}}>
            <Autocomplete
                multiple
                fullWidth
                options={dropDownOptions}
                getOptionLabel={(option) => option.label}
                value={dropDownOptions.filter(opt => selectedOptions.map(s => s.value).includes(opt.value))}
                onChange={(event, newValue) => {
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
                label="Aramak istediğiniz notaları seçin..." 
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
    </Card>
    
    <Card sx={{maxWidth: "100%", marginTop:"1rem"}}>
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
    </Card>
   </>
  )
}

export default SearchByNoteBox