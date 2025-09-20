import { useState } from "react";
import type { AppDispatch, RootState } from "../../../app/store";
import type { Concentration } from "../api/types";
import { addNewConcentration, deleteExistingConcentration, updateExistingConcentration } from "../thunks/concentrationThunks";
import { useDispatch, useSelector } from "react-redux";

export function useConcentrationForm(initial?: Concentration) {

    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState<string>(initial?.name || "");
    const [displayName, setDisplayName] = useState<string>(initial?.display_name || "");
    const [id, setId] = useState<string>(initial?._id || "");

    const concentrations = useSelector(
        (state: RootState) => state.concentration.concentrations
      );
    
    const concentrationDropdownOptions = concentrations
        .filter((c): c is (typeof c) & { _id: string } => !!c._id)
        .map((c) => ({
          value: c._id,
          label: `${c.name} - ${c.display_name}`,
        }));

    const reset = () => {
        setName("");
        setDisplayName("");
        setId("");
    }

    const handleAdd = () => {
        const newConcentration: Concentration = {
            name: name,
            display_name: displayName
        }
        dispatch(addNewConcentration(newConcentration));
        reset();
    }

    const handleUpdate = () => {
        if(!id) return;
        const updatedConcentration: Concentration & {_id: string} = {
            _id: id,
            name: name,
            display_name: displayName,
        }
        dispatch(updateExistingConcentration(updatedConcentration));
        reset();
    }

    const handleDelete = () => {
        if(!id) return;
        dispatch(deleteExistingConcentration(id));
        reset();
    }

    return {
        concentrations,
        name,
        setName,
        displayName,
        setDisplayName,
        id,
        setId,
        concentrationDropdownOptions,
        handleAdd,
        handleUpdate,
        handleDelete
    }
}