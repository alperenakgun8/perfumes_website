import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { useState } from "react";
import type { PerfumeAdd, SelectedNote } from "../api/types";
import { addNewPerfume, deleteExistingPerfume, updateExistingPerfume } from "../thunks/perfumeThunks";

export function usePerfumeForm () {
    const dispatch = useDispatch<AppDispatch>();
    
    const perfumes = useSelector((state: RootState) => state.perfume.perfumes);
    const concentrations = useSelector((state: RootState) => state.concentration.concentrations);
    const noteList = useSelector((state: RootState) => state.note.notes);
    const genders = ["Kadın", "Erkek", "Unisex"];

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [concentrationId, setConcentrationId] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [notes, setNotes] = useState<SelectedNote[]>([]);
    const [selectedOption, setSelectedOption] = useState<{label: string, value: string}>({label: "", value:""});

    const perfumeDropDownOptions = perfumes.filter((p): p is (typeof p) & {_id: string} => !!p._id).map(p => ({value: p._id, label: `${p.brand} - ${p.name}`})).sort((a,b) => a.label.localeCompare(b.label, "tr", {sensitivity: "base"}));

    const concentrationDropDownOptions = concentrations
    .filter((c): c is (typeof c) & { _id: string } => !!c._id)
    .map(c => ({ value: c._id, label: c.name }));

    const selectItemsDropDownOptions = noteList
    .filter((s): s is (typeof s) & { _id: string } => !!s._id)
    .map(s => ({ value: s._id, label: s.name }));

    const handleNotesChange = (noteType: "TOP" | "MIDDLE" | "BASE", selectedIds: string[]) => {
    setNotes(prevNotes => {
    // Aynı türden önceki seçimleri çıkar
    const filtered = prevNotes.filter(n => n.note_type !== noteType);
      // Yeni seçimleri ekle
    const updated = selectedIds.map(id => ({ note_id: id, note_type: noteType } as const));
      return [...filtered, ...updated];
    });};

     // Seçilebilecek seçenekleri filtrele
      const getAvailableNotes = (noteType: "TOP" | "MIDDLE" | "BASE") => {
        const selectedIdsOtherTypes = notes
          .filter(n => n.note_type !== noteType)
          .map(n => n.note_id);
        return selectItemsDropDownOptions.filter(opt => !selectedIdsOtherTypes.includes(opt.value));
      };

      const reset = () => {
          setName("");
          setDescription("");
          setConcentrationId("");
          setBrand("");
          setGender("");
          setImageUrl("");
          setNotes([]);
      }
 
      const handleAdd = () => {
          const newPerfume: PerfumeAdd = {
            name,
            description,
            concentration_id: concentrationId,
            brand,
            gender,
            image_url: imageUrl,
            notes
          };
          dispatch(addNewPerfume(newPerfume));
          reset();
        };

        const handleUpdate = () => {
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
            reset();
        };

        const handleDelete = () => {
            dispatch(deleteExistingPerfume(selectedOption.value));
            setSelectedOption({label: "", value: ""});
        }


    return {
        perfumes,
        genders,
        concentrationDropDownOptions,
        perfumeDropDownOptions,
        selectItemsDropDownOptions,
        handleNotesChange,
        getAvailableNotes,
        selectedOption,
        setSelectedOption,
        name,
        setName,
        description,
        setDescription,
        imageUrl,
        setImageUrl,
        concentrationId,
        setConcentrationId,
        brand,
        setBrand,
        gender,
        setGender,
        notes,
        setNotes,
        handleAdd,
        handleUpdate,
        handleDelete
    }
}