import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { useState } from 'react';
import type { PerfumeAdd, SelectedNote } from '../api/types';
import { updateExistingPerfume } from '../thunks/perfumeThunks';

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
  const dispatch = useDispatch<AppDispatch>();

  const [selectedOption, setSelectedOption] = useState<{label: string, value: string}>({label: "", value:""});
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [concentrationId, setConcentrationId] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [notes, setNotes] = useState<SelectedNote[]>([]);

  const concentrations = useSelector((state: RootState) => state.concentration.concentrations);
  const perfumes = useSelector((state:RootState) => state.perfume.perfumes);
  const noteList = useSelector((state: RootState) => state.note.notes);
  const genders = ["Male", "Female", "Unisex"];

  const perfumeDropDownOptions = perfumes.filter((p): p is (typeof p) & {_id: string} => !!p._id).map(p => ({value: p._id, label: `${p.brand} - ${p.name}`}));

  const concentrationDropDownOptions = concentrations
    .filter((c): c is (typeof c) & { _id: string } => !!c._id)
    .map(c => ({ value: c._id, label: c.name }));

  const selectItemsDropDownOptions = noteList
    .filter((s): s is (typeof s) & { _id: string } => !!s._id)
    .map(s => ({ value: s._id, label: s.name }));

  // Genel handler, noteType = "TOP" | "MIDDLE" | "BASE"
  const handleNotesChange = (noteType: "TOP" | "MIDDLE" | "BASE", selectedIds: string[]) => {
    setNotes(prevNotes => {
      // Aynı türden önceki seçimleri çıkar
      const filtered = prevNotes.filter(n => n.note_type !== noteType);
      // Yeni seçimleri ekle
      const updated = selectedIds.map(id => ({ note_id: id, note_type: noteType } as const));
      return [...filtered, ...updated];
    });
  };

  // Seçilebilecek seçenekleri filtrele
  const getAvailableNotes = (noteType: "TOP" | "MIDDLE" | "BASE") => {
    const selectedIdsOtherTypes = notes
      .filter(n => n.note_type !== noteType)
      .map(n => n.note_id);
    return selectItemsDropDownOptions.filter(opt => !selectedIdsOtherTypes.includes(opt.value));
  };

  const handleUpdatePerfume = () => {
    const newPerfume: PerfumeAdd & {_id: string} = {
      _id: selectedOption.value,
      name,
      description,
      concentration_id: concentrationId,
      brand,
      gender,
      image_url: imageUrl,
      notes
    };
    dispatch(updateExistingPerfume(newPerfume));

    // Reset form
    setName("");
    setDescription("");
    setConcentrationId("");
    setBrand("");
    setGender("");
    setImageUrl("");
    setNotes([]);
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
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
        <Button variant="contained" color="primary" onClick={handleUpdatePerfume}>
          Update Perfume
        </Button>
      </CardActions>
    </Card>
  );
}

export default UpdatePerfume;


