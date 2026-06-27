import { Component } from 'react'
import './app.scss'
import api from './api-entry';
class App extends Component {

  componentDidMount() {
    const params = {
      page: 1,
      perPage: 10,
      filter: {
        sticky: 0,
        essence: 1,
        // sort: 2,
        // attention: 1,
        // categoryids: [1, 2, 3],
      },
    };

    api.readThreadList({ params })
      .then(result => console.log('read', result));
    api.readThreadDetail({ params: { pid: 40 } })
      .then(result => console.log('detail', result));

    api.readCategories().then(result => console.log('categories', result));

    api.readCommentList().then(result => console.log('commentlist', result))

    api.readStickList().then(result => console.log('sticklist', result));
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
