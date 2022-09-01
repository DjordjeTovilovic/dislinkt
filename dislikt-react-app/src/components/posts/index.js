import {Container, Comment, Comments, CommentBox, 
  CommentsSection, SharedActor, Description, Selected,
  SharedImage, SocialCounts} from './styles'
import { useEffect, useState } from 'react';
import { commentPost, dislikePost, getPostsForUsers, likePost } from '../../services/post';
import userService from '../../services/user';
import { useNavigate } from 'react-router-dom';

const Article = () => {
  const [posts, setPosts] = useState([])
  const [commentText, setCommentText] = useState({})
  const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await getPostsForUsers()
			setPosts(fetchedData.posts)
      console.log(fetchedData)
		}
		fetchData()
	}, [])

  const handleCommentChange = (value, postId) => {
    const f = commentText
    f[postId] = value
    setCommentText(f)
  }
  
  const handlePostLike = async(postId) => {
    const likedPost = await likePost(postId)

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return likedPost
      }
      return post
    })
    setPosts(updatedPosts)
  }


  const handlePostDislike = async(postId) => {
    const likedPost = await dislikePost(postId)

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return likedPost
      }
      return post
    })
    setPosts(updatedPosts)
  }

  const handleCommentPost = async (postId) => {
    const newComment = await commentPost({body: commentText[postId]}, postId)
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        if (post.comments)
          post.comments.push(newComment)
        else
          post.comments = [newComment]
      }
      return post
    })
    setPosts(updatedPosts)
    handleCommentChange('', postId)
  }


  const handleProfileClick = async (authorUsername) => {
    const author = await userService.getByUsername(authorUsername)
    navigate(`/profile/${author.id}`)
  }
  
  return (
    <Container>
      {posts && posts.map((post) => 
        <div key={post.id}>
        <SharedActor onClick={() => handleProfileClick(post.authorUsername)}>
          <a>
            <img src="/images/user.svg"></img>
            <div>
            <span>
                {post.authorUsername}
              </span>
              <span>
                {post.title}
              </span>
            </div>
          </a>
          <button>
            <img src="/images/ellipsis.svg"></img>
          </button>
        </SharedActor>
        <Description>{post.body}</Description>

        {post.image &&
          <SharedImage>
            <a>
              <img src={'/' + post.image}></img>
            </a>
          </SharedImage>
          }
          
          <SocialCounts>
            <li>
              <button className={post.liked && 'active'} onClick={() => handlePostLike(post.id)}>
                <img src="/images/like-icon.svg" alt=""></img>
                <span>{post.likeCount}</span>
              </button>
            </li>
            <li>
              <button className={post.disliked && 'active'} onClick={() => handlePostDislike(post.id)}>
                <img style={{transform: 'rotate(180deg)'}} src="/images/like-icon.svg" alt=""></img>
                <span>{post.dislikeCount}</span>
              </button>
            </li>
            <li>
              <a>{post.comments && post.comments.length} comments</a>
            </li>
          </SocialCounts>
          <CommentsSection>
            <Comments>

            {post.comments && post.comments.map((comment) => 
            <CommentBox key={comment.id}>
                <img onClick={() => handleProfileClick(comment.authorUsername)} src='/images/user.svg'></img>
                  <div className='comment-info'>
                    <h3>{comment.authorUsername}</h3>
                    <p>{comment.body}</p>
                    <p className='date'>{new Date(comment.createdAt).toLocaleTimeString()}</p>
                  </div>
              </CommentBox>
            )}
            </Comments> 
            <Comment>
                <textarea placeholder='Comment on this...' value={commentText[post.id]} onChange={(e) => handleCommentChange(e.target.value, post.id)} maxLength="250"></textarea>
                <button onClick={() => handleCommentPost(post.id)}>Post</button>
            </Comment>  
          </CommentsSection> 
        </div>
      )}
    </Container>
   )
}

export default Article;

