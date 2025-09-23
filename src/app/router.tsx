import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import ConcentrationManagementPage from "../pages/admin/ConcentrationManagementPage";
import NoteManagementPage from "../pages/admin/NoteManagementPage";
import PerfumeManagementPage from "../pages/admin/PerfumeManagementPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import SearchByNotesPage from "../pages/user/SearchByNotesPage";
import PerfumeDetailsPage from "../pages/user/PerfumeDetailsPage";
import SearchPerfumePage from "../pages/user/SearchPerfumePage";

function Router() {
    return(
        <Routes>
            <Route path="/" element={<SearchByNotesPage/>}/>
            <Route path="/detail" element={<PerfumeDetailsPage/>}/>
            <Route path="/perfumes" element={<SearchPerfumePage/>}></Route>
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