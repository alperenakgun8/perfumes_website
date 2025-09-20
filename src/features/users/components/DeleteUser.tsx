import { useUserForm } from '../hooks/useUserForm';
import { 
    Card,
    CardContent,
    Grid,
    CardActions,
    Button,
    Typography,
    Autocomplete,
    TextField,
 } from '@mui/material'

function DeleteUser() {

    const { dropDownOptions, selectedOption, setSelectedOption, handleDelete } = useUserForm();

  return (
    <Card sx = {{maxWidth: 600, margin: "2rem auto", padding:2, boxShadow: 3}}>
        <CardContent>
            <Typography variant='h5' gutterBottom>
                Delete User
            </Typography>
            <Grid container spacing={2}>
                <Grid size= {{xs: 12}}>
                    <Autocomplete
                        options={dropDownOptions}
                        getOptionLabel={(option) => option.label}
                        value={selectedOption}
                        onChange={(event, newValue) => setSelectedOption(newValue ?? {label: "", value: ""})}
                        renderInput={(params) => <TextField {...params} label="Selected User" placeholder='Search'/>}
                        disableClearable={false}
                    />
                </Grid>
            </Grid>
        </CardContent>

        <CardActions sx={{justifyContent: "flex-end", padding: "1rem"}}>
            <Button variant='contained' color='error' onClick={handleDelete}>
                Delete User
            </Button>
        </CardActions>
    </Card>
  )
}

export default DeleteUser