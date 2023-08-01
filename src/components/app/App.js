import AppHeader from "../appHeader/AppHeader";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/MainPage'))
const Comics = lazy(() => import('../pages/Comics'))
const Page404 = lazy(() => import('../pages/404'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))


const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/comics" element={<Comics/>} />
              <Route path="/comics/:comicId" element={<SingleComicPage/>} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App;