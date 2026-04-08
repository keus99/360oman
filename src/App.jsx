import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Guides from './pages/Guides'
import GuideDetailPage from './pages/GuideDetailPage'
import Checklists from './pages/Checklists'
import ChecklistDetailPage from './pages/ChecklistDetailPage'
import Directory from './pages/Directory'
import AskPage from './pages/AskPage'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guides" element={<Guides />} />
          <Route path="guides/:slug" element={<GuideDetailPage />} />
          <Route path="checklists" element={<Checklists />} />
          <Route path="checklists/:slug" element={<ChecklistDetailPage />} />
          <Route path="directory" element={<Directory />} />
          <Route path="ask" element={<AskPage />} />
        </Route>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
