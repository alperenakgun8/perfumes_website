import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import ConcentrationManagementPage from "../pages/admin/ConcentrationManagementPage";
import NoteManagementPage from "../pages/admin/NoteManagementPage";
import PerfumeManagementPage from "../pages/admin/PerfumeManagementPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import SearchByNotesPage from "../pages/user/PerfumePages/SearchByNotesPage";
import PerfumeDetailsPage from "../pages/user/PerfumePages/PerfumeDetailsPage";
import SearchPerfumePage from "../pages/user/PerfumePages/SearchPerfumePage";
import LoginPage from "../pages/user/AuthPages/LoginPage";
import RegisterPage from "../pages/user/AuthPages/RegisterPage";
import ProfilePage from "../pages/user/ProfilePages/ProfilePage";
import ProfileManagement from "../pages/user/ProfilePages/ProfileManagement";
import FavoritesPage from "../pages/user/ProfilePages/FavoritesPage";
import PasswordManagementPage from "../pages/user/ProfilePages/PasswordManagementPage";
import ForumPage from "../pages/user/ForumPages/ForumPage";
import TopicDetailsPage from "../pages/user/ForumPages/TopicDetailsPage";
import CreateTopicPage from "../pages/user/ForumPages/CreateTopicPage";

function Router() {
    return(
        <Routes>
            <Route path="/" element={<SearchByNotesPage />} />
            <Route path="/perfumedetail/:id" element={<PerfumeDetailsPage />} />
            <Route path="/perfumes" element={<SearchPerfumePage />} />

            <Route path="/forum" element={<ForumPage/>}/>
            <Route path="/createtopic" element={<CreateTopicPage/>}/>
            <Route path="/topicdetail/:id" element={<TopicDetailsPage/>}/>

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