import ConcentrationList from '../features/concentrations/components/ConcentrationList/ConcentrationList';
import AddConcentration from '../features/concentrations/components/AddConcentration/AddConcentration';
import UpdateConcentration from '../features/concentrations/components/UpdateConcentration/UpdateConcentration';
import DeleteConcentration from '../features/concentrations/components/DeleteConcentration/DeleteConcentration';
import NoteList from '../features/notes/components/NoteList/NoteList';
import AddNote from '../features/notes/components/AddNote/AddNote';
import DeleteNote from '../features/notes/components/DeleteNote/DeleteNote';
import UpdateNote from '../features/notes/components/UpdateNote/UpdateNote';


function AdminPage() {
  return (
    <div>
        <ConcentrationList/>
        <AddConcentration/>
        <UpdateConcentration/>
        <DeleteConcentration/>
        <NoteList/>
        <AddNote/>
        <UpdateNote/>
        <DeleteNote/>
    </div>
  )
}

export default AdminPage