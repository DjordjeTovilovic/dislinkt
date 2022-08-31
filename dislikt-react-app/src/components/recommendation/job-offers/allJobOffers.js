import styled from 'styled-components'

const AllJobOffers = (props) => {
    return(
        <Container>
            <Content>
            <h1>Job offers</h1>
                <List>
                    <Job>
                        <div>
                            <h2>Microsoft</h2>
                            <label className='label'>Requires  <h3> senior React Native engineer</h3>!!</label>
                        </div>
                        <button>View</button>
                    </Job>

                    <Job>
                        <div>
                            <h2>Facebook</h2>
                            <label className='label'>Requires  <h3> senior Spring boot engineer</h3>!!</label>
                        </div>
                        <button>View</button>
                    </Job>
                </List>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    padding: 62px;
    max-width: 100%;`;

const Content = styled.div`

    h1{
        padding: 20px 12px 20px 12px;
        font-size: 40px;
    }

    margin:auto;
    width: 40%;
    border: 1px solid lightgray;
    overflow-y: auto;
    background-color: white;
    border-radius: 5px;
`;

const List = styled.li`
    list-style: none;
`;

const Job = styled.div`

    flex-direction: row;
    display: flex;
    padding: 10px;
    width: 96%;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    border: 1px solid lightgray;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

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
        flex-direction: column;
        align-items: left ;
        gap: 10px;
    
        h2 {
            font-size: x-large;;
        }
        label {
            display: flex;
            flex-direction: row ;
            gap: 7px;
        }
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

export default AllJobOffers;