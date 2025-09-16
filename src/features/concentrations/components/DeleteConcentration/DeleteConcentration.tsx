import DropDown from "../../../../shared/components/DropDown/DropDown";
import Button from "../../../../shared/components/Button/Button";
import './DeleteConcentration.css'

import type { AppDispatch, RootState } from "../../../../app/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteExistingConcentration } from "../../thunks/concentrationThunks";

function DeleteConcentration() {

  const dispatch = useDispatch<AppDispatch>();

   const [selectedId, setSelectedId] = useState<string>("");
    const concentrations = useSelector((state: RootState) => state.concentration.concentrations);

    const dropDownOptions = concentrations.filter((c): c is (typeof c) & {_id: string} => !!c._id).map(c => ({
        value: c._id,
        label: `${c.name} - ${c.display_name}`
    }));

    const handleDeleteConcentration = () => {
      dispatch(deleteExistingConcentration(selectedId));
    }

  return (

    <div className="delete-concentration">
      <DropDown
        size="medium"
        options={dropDownOptions}
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        variant="primary"
      />
      <Button
        name="Delete"
        size="medium"
        variant="danger"
        onClick={handleDeleteConcentration}
      />
    </div>
  )
}

export default DeleteConcentration