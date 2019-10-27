import * as React from 'react'
import { API } from 'aws-amplify'
import LineStatus, { LineProps } from './ui/LineStatus'
import { ChangeEvent } from 'react'
import Search from './ui/Search'
import Update from './ui/Update'
import Loading from './ui/Loading'

type Line = {
  name: string
  notice: boolean
}

interface LinesState {
  lines: Array<Line>
  loading: boolean
  keyword: string
}

export default class App extends React.Component<any, LinesState> {
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

  async componentDidMount() {
    await this.update()
  }

  async changeNotice(props) {

    await API.put("APIGatewayAPI", `/lines/${encodeURI(props.name)}`, {
      body: {
        name: props.name,
        notice: !props.notice
      }
    })

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
    this.setState({ keyword })
  }

  lines() {
    return this.state.lines
      .filter(
        line => line.name.match(
          new RegExp(
            this.state.keyword
              .replace(/[\\^$.*+?()[\]{}|]/g, '.*\\$&.*')
          )
        )
      )
      .map((line, i) => <LineStatus
          name={line.name}
          notice={line.notice}
          key={i}
          handleClick={this.changeNotice.bind(this, line)}
        />
      )
  }

  render() {
    return <>
      <h1>遅延バッチ</h1>
      <Search handleInput={this.inputKeyword}/>
      <Update handleClick={this.update}/>

      {
        this.state.loading
          ? <Loading/>
          : this.lines()
      }
    </>
  }
}
