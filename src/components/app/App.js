import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/errorBoundary";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChar: null
    }
  }

  onActiveCharChange = (id) => {
    this.setState({
      activeChar: id
    })
  }

  render() {

    return (
      <div className="app">
        <AppHeader/>
        <main>
            <ErrorBoundary>
              <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                <CharList 
                  activeChar={this.state.activeChar} 
                  onActiveCharChange={this.onActiveCharChange} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <CharInfo 
                    activeChar={this.state.activeChar} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    )
  }
}

export default App;