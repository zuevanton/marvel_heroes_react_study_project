import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/errorBoundary";
import ComicsList from "../comicsList/ComicsList";


const App = () => {

  const [activeChar, setActiveChar] = useState(null);

  const onActiveCharChange = (id) => {
    setActiveChar(id)
  }


  return (
    <div className="app">
      <AppHeader/>
      <main>
        {/* <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
          <CharList 
            activeChar={activeChar} 
            onActiveCharChange={onActiveCharChange} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo 
              activeChar={activeChar} />
          </ErrorBoundary>
        </div> */}
        <ComicsList />
        <img className="bg-decoration" src={decoration} alt="vision"/>
      </main>
    </div>
  )
}

export default App;