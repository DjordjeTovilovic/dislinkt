import {Container, Comment, Comments, CommentBox, 
  CommentsSection, SharedActor, Description, 
  SharedImage, SocialCounts} from './styles'
import { useEffect, useState } from 'react';
import { getPostsForUsers } from '../../services/post';

const Article = (props) => {
  const [posts, setPosts] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await getPostsForUsers()
			setPosts(fetchedData.posts)
		}
		fetchData()
	}, [])

  {console.log(posts)}
  
  return (
    <Container>
      {posts.map((post) => 
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
              <a>2 comments</a>
            </li>
          </SocialCounts>
          <CommentsSection>
            <Comments>
              <CommentBox>
                <img src='/images/user.svg'></img>
                  <div className='comment-info'>
                    <h3>Vladimir Putin</h3>
                    <p>This is beautifull duck. She is so strong!!</p>
                    <p className='date'>12.08.2022.</p>
                  </div>
              </CommentBox>
              
              <CommentBox>
                <img src='/images/user.svg'></img>
                  <div className='comment-info'>
                    <h3>Milos Bikovic</h3>
                    <p>She lift more then my brother!?!?</p>
                    <p className='date'>12.08.2022.</p>
                  </div>
              </CommentBox>
            </Comments>
            <button>Load more comments</button>
            <Comment>
                <textarea placeholder='Comment on this...' maxLength="250"></textarea>
                <button>Post</button>
            </Comment>  
          </CommentsSection> 
        </div>
      )}
    </Container>
   )
}

export default Article;

