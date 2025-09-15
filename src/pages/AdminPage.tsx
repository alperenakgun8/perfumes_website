import ConcentrationList from '../features/concentrations/components/ConcentrationList/ConcentrationList';
import AddConcentration from '../features/concentrations/components/AddConcentration/AddConcentration';

function AdminPage() {
  return (
    <div>
        <ConcentrationList></ConcentrationList>
        <AddConcentration></AddConcentration>
    </div>
  )
}

export default AdminPage