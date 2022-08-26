import {Container, SharedActor, Description, SharedImage, SocialCounts} from './styles'

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
                <img src="/images/like-svgrepo-com.svg" alt=""></img>
                <span>75</span>
              </button>
            </li>
            <li>
              <a>2 comments</a>
            </li>
          </SocialCounts> 
    </Container>
   )
}

export default Article;

