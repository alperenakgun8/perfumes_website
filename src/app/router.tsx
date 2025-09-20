import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import ConcentrationManagementPage from "../pages/ConcentrationManagementPage";
import NoteManagementPage from "../pages/NoteManagementPage";
import PerfumeManagementPage from "../pages/PerfumeManagementPage";
import UserManagementPage from "../pages/UserManagementPage";

function Router() {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/admin" element={<AdminPage/>}>
                <Route path="concentration" element={<ConcentrationManagementPage/>}/>
                <Route path="note" element={<NoteManagementPage/>}/>
                <Route path="perfume" element={<PerfumeManagementPage/>}/>
                <Route path="user" element={<UserManagementPage/>}/>
            </Route>
        </Routes>
    );
}

export default Router