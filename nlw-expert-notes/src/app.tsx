import { useState, ChangeEvent } from 'react';
import logo from './assets/purplenotes.png';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';

interface Note{
  id: string
  date: Date
  content: string
}

export function App() {

  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {

    const notesOnStorage = localStorage.getItem('notes')
    if (notesOnStorage){
      return JSON.parse(notesOnStorage)
    }

    return[]
  })

  function onNoteCreated(content: string){
    const newNote={
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))

  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  }

  const filteredNotes = search != ''
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : notes


  
  return (
  <div className="mx-auto max-w-6xl my-12 space-y-6">
    <img src={logo} className='h-20' alt="purplenotes"/>

    <form className='w-full'>
      <input
        type="text"
        placeholder="busque suas notas"
        className="w-full bg-transparent text=3xl font-semibold tracking-tight outline-none placefonder:text-zinc-500"
        onChange={handleSearch}
        />
    </form>

    <div className='h-px bg-zinc-700'></div>

    <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>

      <NewNoteCard onNoteCreated={onNoteCreated}/>

      {filteredNotes.map(note => {return <NoteCard key={note.id} note={note} />})}
    
      </div>

    </div>
  )
}