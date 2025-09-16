import TextInput from "../../../../shared/components/TextInput/TextInput";
import Button from "../../../../shared/components/Button/Button";
import DropDown from "../../../../shared/components/DropDown/DropDown";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/store";
import { updateExistingConcentration } from "../../thunks/concentrationThunks";
import { useState } from "react";

import './UpdateConcentration.css'

function UpdateConcentration() {

    const dispatch = useDispatch<AppDispatch>();

    const [selectedId, setSelectedId] = useState<string>("");
    const [updatedName, setUpdatedName] = useState<string>("");
    const [updatedDisplayName, setUpdatedDisplayName] = useState<string>("");

    const concentrations = useSelector((state: RootState) => state.concentration.concentrations);

    const dropDownOptions = concentrations.filter((c): c is (typeof c) & {_id: string} => !!c._id).map(c => ({
        value: c._id,
        label: `${c.name} - ${c.display_name}`
    }));

    const handleUpdateConcentration = () => {
        const updatedConcentration = {
            _id: selectedId,
            name: updatedName,
            display_name: updatedDisplayName
        }
        
        dispatch(updateExistingConcentration(updatedConcentration));

        setUpdatedName("");
        setUpdatedDisplayName("");
        setSelectedId("");
    }

  return (
    <div className="update-concentration">
        <DropDown
            size="medium"
            options={dropDownOptions}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            variant="primary"
        />
        <TextInput
            variant="primary"
            placeholder="Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
        />
        <TextInput
            variant="primary"
            placeholder="Name"
            value={updatedDisplayName}
            onChange={(e) => setUpdatedDisplayName(e.target.value)}
        />
        <Button
            name="Update"
            size="medium"
            variant="primary"
            onClick={handleUpdateConcentration}
        />
    </div>
  )
}

export default UpdateConcentration