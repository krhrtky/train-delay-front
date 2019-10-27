import * as React from 'react';
import { render } from "react-dom";
import Amplify from 'aws-amplify'
import { API } from 'aws-amplify'
import { ChangeEvent } from 'react'

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "APIGatewayAPI",
        endpoint: process.env.API_END_POINT
      },
    ]
  }
})

type Line = {
  name: string
  notice: boolean
}

interface LinesState {
  lines: Array<Line>
  loading: boolean
  keyword: string
}

interface LineProps {
  name: string
  notice: boolean
  handleClick: (e: any) => Promise<void>
}

const Line = (props: LineProps) => <h2>
  {props.name}:
  <button onClick={props.handleClick}>
    {props.notice ? '非通知にする' : '通知する'}
  </button>
</h2>

interface SearchProcess {
  handleInput: (e: any) => void
}

const Search = (props: SearchProcess) =>
  <label>キーワード
    <input type="text" name="keyword" onChange={props.handleInput}/>
  </label>

const Main = () => <h1>遅延バッチ</h1>
class App extends React.Component<any, LinesState> {
  constructor(props) {
    super(props)
    this.state = {
      lines: [],
      loading: false,
      keyword: ''
    }
    this.update = this.update.bind(this)
    this.inputKeyword = this.inputKeyword.bind(this)
  }

  async update() {
    this.setState({ loading: true })
    try {
      const { data } = await API.get("APIGatewayAPI", "/lines", { response: true })
      this.setState({
        lines: data.lines as Array<LineProps>
      })
    } catch (e) {
      console.error(e)
    }
    this.setState({ loading: false })
  }

  async componentDidMount(): Promise<void> {
    await this.update()
  }

  async changeNotice(props) {

    await API.put("APIGatewayAPI", `/lines/${encodeURI(props.name)}`, {
      body: {
        name: props.name,
        notice: !props.notice
      }})

    this.setState({
      lines: this.state.lines.map(line => {
        return line.name === props.name ?
          {
            name: line.name,
            notice: !line.notice
          }
          : line
      })
    })
  }

  inputKeyword(e: ChangeEvent) {
    const keyword = (e.target as HTMLInputElement).value
    this.setState({keyword})
  }

  render() {
    return <>
      <Main/>
      <Search handleInput={this.inputKeyword}/>
      <button onClick={this.update}>update</button>

      {
        this.state.loading
          ? <p>loading</p>
          : this.state.lines.filter(
            line => line.name.match(
              new RegExp(
                this.state.keyword
                  .replace(/[\\^$.*+?()[\]{}|]/g, '.*\\$&.*')
              )
            )
          )
            .map((line, i) => <Line
                name={line.name}
                notice={line.notice}
                key={i}
                handleClick={this.changeNotice.bind(this, line)}
              />
            )}
    </>
  }
}

render(<App/>, document.querySelector('#app'));
