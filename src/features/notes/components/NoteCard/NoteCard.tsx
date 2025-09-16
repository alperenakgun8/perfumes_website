import './NoteCard.css'

interface NoteCardProps {
    name: string,
    image_url: string
}

function NoteCard({name , image_url }: NoteCardProps) {
  return (
    <div className='note-card'>
        <img src={image_url}  />
        <h5>{name}</h5>
    </div>
  )
}

export default NoteCard