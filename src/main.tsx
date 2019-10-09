import * as React from 'react';
import { render } from "react-dom";

const Main = prop => <h1>Hello</h1>
class App extends React.Component {
  render() {
    return <Main/>
  }
}

render(<App/>, document.querySelector('#app'));
