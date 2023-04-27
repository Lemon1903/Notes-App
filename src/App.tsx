import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import NotePage from "./pages/Note/NotePage";
import NotesListPage from "./pages/NotesList/NotesListPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col border border-body lg:rounded-xl overflow-hidden w-screen lg:w-96 h-screen lg:h-[85vh] bg-body">
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<NotesListPage />} />
            <Route path="/favorites" element={<NotesListPage />} />
            <Route path="/notes/:noteId" element={<NotePage />} />
          </Route>
        </Routes>
        <Tabs />
      </div>
    </BrowserRouter>
  );
}
