import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { useState } from "react";
import { deleteExistingUser } from "../thunks/userThunks";

export function useUserForm () {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.user.users);
    const [selectedOption, setSelectedOption] = useState<{label: string, value: string}>({label: "", value: ""});

    const dropDownOptions = users.filter((u): u is (typeof u) & {_id: string} => !!u._id).map(u => ({value: u._id, label: `${u.first_name} ${u.last_name} - ${u.email}`}));

    const handleDelete = () => {
        dispatch(deleteExistingUser(selectedOption.value));
        setSelectedOption({label: "", value: ""});
    }

    return {
        users,
        dropDownOptions,
        selectedOption,
        setSelectedOption,
        handleDelete
    }
}