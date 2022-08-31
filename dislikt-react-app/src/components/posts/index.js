import {Container, Comment, Comments, CommentBox, 
  CommentsSection, SharedActor, Description, 
  SharedImage, SocialCounts} from './styles'
import { useEffect, useState } from 'react';
import { commentPost, getPostsForUsers } from '../../services/post';

const Article = () => {
  const [posts, setPosts] = useState([])
  const [commentText, setCommentText] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await getPostsForUsers()
			setPosts(fetchedData.posts)
      console.log(fetchedData)
		}
		fetchData()
	}, [])


  const handlePostLike = () => {

  }

  const handleCommentPost = async (postId) => {
    const newComment = await commentPost({body: commentText}, postId)
    const updatedPosts = posts.map(post => {
      if (post.id === postId) post.comments.push(newComment)
      return post
    })
    setPosts(updatedPosts)
    setCommentText('')
  }
  
  return (
    <Container>
      {posts && posts.map((post) => 
        <div key={post.id}>
        <SharedActor>
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
          <SharedImage>
            <a>
              <img src="/images/random-image.png"></img>
            </a>
          </SharedImage>
          <SocialCounts>
            <li>
              <button>
                <img src="/images/like-icon.svg" alt=""></img>
                <span>{post.likeCount}</span>
              </button>
            </li>
            <li>
              <button onClick={() => handlePostLike}>
                <img style={{transform: 'rotate(180deg)'}} src="/images/like-icon.svg" alt=""></img>
                <span>{post.likeCount}</span>
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
                <img src='/images/user.svg'></img>
                  <div className='comment-info'>
                    <h3>{comment.authorUsername}</h3>
                    <p>{comment.body}</p>
                    <p className='date'>{new Date(comment.createdAt).toLocaleTimeString()}</p>
                  </div>
              </CommentBox>
            )}
            </Comments> 
            <Comment>
                <textarea placeholder='Comment on this...' value={commentText} onChange={(e) => setCommentText(e.target.value)} maxLength="250"></textarea>
                <button onClick={() => handleCommentPost(post.id)}>Post</button>
            </Comment>  
          </CommentsSection> 
        </div>
      )}
    </Container>
   )
}

export default Article;

