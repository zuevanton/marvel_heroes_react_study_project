import AppHeader from "../appHeader/AppHeader";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Comics, MainPage, Page404, SingleComicPage } from "../pages";


const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/comics" element={<Comics/>} />
            <Route path="/comics/:comicId" element={<SingleComicPage/>} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;