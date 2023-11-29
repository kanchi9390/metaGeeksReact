import Loader from 'react-loader-spinner'
import {Component} from 'react'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PostsPage extends Component {
  state = {apiStatus: apiStatusConstants.initial, postsList: []}

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://metageeksassignment.onrender.com/posts'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const db = await response.json()
    console.log(db)
    if (response.ok) {
      this.setState({apiStatus: apiStatusConstants.success, postsList: db})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosts = () => {
    const {postsList} = this.state
    return (
      <div className="posts-main-page">
        <div className="posts-nav">
          <h1 className="nav-h1">MetaGeeks</h1>
          <h1 className="nav-h2">Posts</h1>
        </div>
        <div className="posts-content">
          <h1 className="main-heading">All Posts</h1>
          <img
            src="https://static.thenounproject.com/png/2602342-200.png"
            alt="posts-img"
            className="posts-logo"
          />
          <ul className="posts-items-list">
            {postsList.map(each => (
              <li className={`post-item card-${each.PostID}`} key={each.PostID}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/linkedin-ui-glyph/48/Sed-01-512.png"
                  alt="post"
                  className="post-img"
                />
                <div className="post-description">
                  <h1 className="post-title">{each.Title}</h1>
                  <p className="post-content">posted by {each.Username}</p>
                </div>
                <button type="button" className="post-btn">
                  View Post
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderPostsFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-h">Oops! Something Went Wrong</h1>
      <p className="failure-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.onRetryBtn}>
        Retry
      </button>
    </div>
  )

  getPostsLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00a8e7" height="50" width="50" />
    </div>
  )

  getSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosts()
      case apiStatusConstants.failure:
        return this.renderPostsFailure()
      case apiStatusConstants.loading:
        return this.getPostsLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.getSwitch()}</>
  }
}

export default PostsPage
