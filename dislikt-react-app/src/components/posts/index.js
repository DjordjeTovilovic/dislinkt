import {Container, Comment, Comments, CommentBox, 
  CommentsSection, SharedActor, Description, 
  SharedImage, SocialCounts} from './styles'
import { useState } from 'react';

const Article = (props) => {
    
  return (
    <Container>
       <SharedActor>
            <a>
              <img src="/images/user.svg"></img>
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="/images/ellipsis.svg"></img>
            </button>
          </SharedActor>
          <Description>Description</Description>
          <SharedImage>
            <a>
              <img src="/images/random-image.png"></img>
            </a>
          </SharedImage>
          <SocialCounts>
            <li>
              <button>
                <img src="/images/like-icon.svg" alt=""></img>
                <span>75</span>
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
    </Container>
   )
}

export default Article;

