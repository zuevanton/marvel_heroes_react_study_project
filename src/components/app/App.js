import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChar: 1011227
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
            <RandomChar/>
            <div className="char__content">
                <CharList activeChar={this.state.activeChar} onActiveCharChange={this.onActiveCharChange} />
                <CharInfo activeChar={this.state.activeChar} />
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    )
  }
}

export default App;