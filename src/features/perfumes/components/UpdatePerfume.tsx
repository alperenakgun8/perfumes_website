import { usePerfumeForm } from '../hooks/usePerfumeForm';
import {
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Autocomplete,
  Checkbox,
  Chip
} from '@mui/material';

function UpdatePerfume() {

  const { selectedOption, setSelectedOption ,name, setName, description, setDescription, imageUrl, setImageUrl, concentrationId, setConcentrationId, brand, setBrand, gender, setGender, notes, genders, concentrationDropDownOptions, perfumeDropDownOptions,handleNotesChange, getAvailableNotes, handleUpdate } = usePerfumeForm();

  return (
    <Card sx={{ margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Perfume
        </Typography>
        <Grid container spacing={2}>
          <Grid size= {{xs: 12}}>
            <Autocomplete
                options={perfumeDropDownOptions}
                getOptionLabel={(option) => option.label}
                value={selectedOption}
                onChange={(event, newValue) => setSelectedOption(newValue ?? {label:"", value:""})}
                renderInput={(params) => <TextField {...params} label="Select Parfume" placeholder='Search'/>}
                disableClearable={false}
            />
          </Grid>
          <Grid size= {{xs: 12, sm: 6}}>
            <TextField fullWidth label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          </Grid>
          <Grid size= {{xs: 12, sm: 6}}>
            <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>

          <Grid size= {{xs: 12}}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid size= {{xs: 12}}>
            <TextField fullWidth label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </Grid>

           <Grid size={{xs: 12, sm: 6}}>
            <FormControl fullWidth>
              <InputLabel>Concentration</InputLabel>
              <Select
                value={concentrationId}
                onChange={(e) => setConcentrationId(e.target.value)}
                input={<OutlinedInput label="Concentration" />}
              >
                {concentrationDropDownOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs: 12, sm: 6}}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select value={gender} onChange={(e) => setGender(e.target.value)} input={<OutlinedInput label="Gender" />}>
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Multiple Notes with search */}
          <Grid size= {{xs: 12, sm: 6}}>
            <Autocomplete
              multiple
              options={getAvailableNotes("TOP")}
              getOptionLabel={(option) => option.label}
              value={getAvailableNotes("TOP").filter(opt =>
                notes.filter(n => n.note_type === "TOP").map(n => n.note_id).includes(opt.value)
              )}
              onChange={(e, newValue:{value: string, label: string}[]) => handleNotesChange("TOP", newValue.map(v => v.value))}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...otherProps } = props;
                return (
                    (
                <li key={option.value} {...otherProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )
                )
              }}
              renderInput={(params) => <TextField {...params} label="Top Notes" placeholder="Search..." />}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => <Chip label={option.label} {...getTagProps({ index })} />)
              }
            />
          </Grid>

          <Grid size= {{xs: 12, sm: 6}}>
            <Autocomplete
              multiple
              options={getAvailableNotes("MIDDLE")}
              getOptionLabel={(option) => option.label}
              value={getAvailableNotes("MIDDLE").filter(opt =>
                notes.filter(n => n.note_type === "MIDDLE").map(n => n.note_id).includes(opt.value)
              )}
              onChange={(e, newValue: {value: string, label: string}[]) => handleNotesChange("MIDDLE", newValue.map(v => v.value))}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...otherProps } = props;
                return (
                    
                <li key={option.value} {...otherProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
                
                );
              }}
              renderInput={(params) => <TextField {...params} label="Middle Notes" placeholder="Search..." />}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => <Chip label={option.label} {...getTagProps({ index })} />)
              }
            />
          </Grid>

          <Grid size= {{xs: 12, sm: 6}}>
            <Autocomplete
              multiple
              options={getAvailableNotes("BASE")}
              getOptionLabel={(option) => option.label}
              value={getAvailableNotes("BASE").filter(opt =>
                notes.filter(n => n.note_type === "BASE").map(n => n.note_id).includes(opt.value)
              )}
              onChange={(e, newValue: {value: string, label: string}[]) => handleNotesChange("BASE", newValue.map(v => v.value))}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...otherProps} = props;
                return (
                <li key={option.value} {...otherProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )
              }}
              renderInput={(params) => <TextField {...params} label="Base Notes" placeholder="Search..." />}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => <Chip label={option.label} {...getTagProps({ index })} />)
              }
            />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Perfume
        </Button>
      </CardActions>
    </Card>
  );
}

export default UpdatePerfume;


