import styled from 'styled-components'

const FollowerRecommendation = (props) => {
    
    return (
    <Container>
        <Content>
            <h1>Recommendations</h1>
            <List>
                <Person>
                    <div>
                        <img src='/images/user.svg'></img>
                        <h3>Milutin Milankovic</h3>
                    </div>
                    <button>Follow</button>
                </Person>
                
                <Person>
                    <div>
                        <img src='/images/user.svg'></img>
                        <h3>Milutin Milankovic</h3>
                    </div>
                    <button>Follow</button>
                </Person>
                
            </List>
        </Content>
    </Container>
    );
}

export default FollowerRecommendation;

const Container = styled.div`
    padding: 62px;
    max-width: 100%;`;

const Content = styled.div`

    h1{
        padding: 20px 12px 20px 12px;
        font-size: x-large;
    }

    margin:auto;
    width: 40%;
    border: 1px solid lightgray;
    overflow-y: auto;
    background-color: white;
`;

const List = styled.li`
    list-style: none;
`;

const Person = styled.div`

    flex-direction: row;
    display: flex;
    padding: 10px;
    width: 95%;
    align-items: center;
    justify-content: space-between;

    button{
       width: 80px;
       height: 35px;
       border-radius: 24px;
       background-color:  #0a66c2 ;
       border: none;
       color: white;
       cursor: pointer;
       padding: 8px;
       margin-top: 5px;
     
       &:hover {
         background-color: #00b3db;
         border-color: #285e8e;
       }
   }

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;