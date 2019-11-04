import * as React from 'react'
import { API } from 'aws-amplify'
import LineStatus from './ui/LineStatus'
import { ChangeEvent } from 'react'
import Search from './ui/Search'
import Update from './ui/Update'
import Loading from './ui/Loading'
import styled from 'styled-components'

export type Line = {
  name: string
  notice: boolean
}

const Wrapper = styled.div`
    width: 70vh;
    height: 80vh;
    overflow: auto;
    `

interface LinesState {
  lines: Array<Line>
  loading: boolean
  keyword: string
}

export default class Lines extends React.Component<any, LinesState> {
  constructor(props) {
    super(props)
    this.state = {
      lines: [],
      loading: false,
      keyword: ''
    }
    this.update = this.update.bind(this)
    this.inputKeyword = this.inputKeyword.bind(this)
    this.change = this.change.bind(this)
  }

  async update() {
    this.setState({ loading: true })
    try {
      const { data } = await API.get("APIGatewayAPI", "/lines", { response: true })
      this.setState({
        lines: data.lines as Array<Line>
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

  async change(e) {
    const value = (e.currentTarget as HTMLInputElement).value
    const target = this.state.lines.find(line => line.name === value)

    if (target) {
      await this.changeNotice(target)
    }
  }

  filterLine(): Array<Line> {
    return this.state.lines
      .filter(
        line => line.name.match(
          new RegExp(
            this.state.keyword
              .replace(/[\\^$.*+?()[\]{}|]/g, '.*\\$&.*')
          )
        )
      )
  }

  inputKeyword(e: ChangeEvent) {
    const keyword = (e.target as HTMLInputElement).value
    this.setState({ keyword })
  }

  clearKeyword() {
    this.setState({ keyword: '' })
  }


  render() {
    return <>
      <Search
        keyword={this.state.keyword}
        handleInput={this.inputKeyword}
        clear={this.clearKeyword.bind(this)}
      />
      <Update handleClick={this.update}/>

      {
        this.state.loading
          ? <Loading/>
          : (
            <Wrapper>
              <LineStatus handleClick={this.change} lines={this.filterLine()} />
            </Wrapper>
          )
      }
    </>
  }
}
