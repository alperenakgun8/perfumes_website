import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import ConcentrationManagementPage from "../pages/admin/ConcentrationManagementPage";
import NoteManagementPage from "../pages/admin/NoteManagementPage";
import PerfumeManagementPage from "../pages/admin/PerfumeManagementPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import SearchByNotesPage from "../pages/user/SearchByNotesPage";
import PerfumeDetailsPage from "../pages/user/PerfumeDetailsPage";
import SearchPerfumePage from "../pages/user/SearchPerfumePage";
import LoginPage from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import ProfilePage from "../pages/user/ProfilePage";
import ProfileManagement from "../pages/user/ProfileManagement";
import FavoritesPage from "../pages/user/FavoritesPage";
import PasswordManagementPage from "../pages/user/PasswordManagementPage";

function Router() {
    return(
        <Routes>
            <Route path="/" element={<SearchByNotesPage />} />
            <Route path="/detail/:id" element={<PerfumeDetailsPage />} />
            <Route path="/perfumes" element={<SearchPerfumePage />} />

            <Route path="/profile" element={<ProfilePage />}>
                <Route path="profile" element={<ProfileManagement/>}/>
                <Route path="favorites" element={<FavoritesPage/>}/>
                <Route path="passwordchange" element={<PasswordManagementPage/>}/>
            </Route>

            <Route path="/admin" element={<AdminPage />}>
                <Route path="concentration" element={<ConcentrationManagementPage />}/>
                <Route path="note" element={<NoteManagementPage />} />
                <Route path="perfume" element={<PerfumeManagementPage />} />
                <Route path="user" element={<UserManagementPage />} />
            </Route>
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default Router