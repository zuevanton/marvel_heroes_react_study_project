import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/errorBoundary";
import { useState } from "react";

const MainPage = () => {
  const [activeChar, setActiveChar] = useState(null);

  const onActiveCharChange = (id) => {
    setActiveChar(id)
  }

  return (
    <>
      <ErrorBoundary>
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
        <img className="bg-decoration" src={decoration} alt="vision"/>
      </div>
    </>
  )
}

export default MainPage;