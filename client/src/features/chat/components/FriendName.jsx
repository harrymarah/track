import styled from 'styled-components'

const FriendNameContainer = styled.li`
  list-style-type: none;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 8px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`
const Name = styled.div`
  padding: 10px 5px;
  flex-grow: 1;
  align-self: center;
`
const Icon = styled.i`
  padding: 10px;
  background-color: rgba(${(props) => props.color}, 0.6);
  border-radius: 5px;
  margin: 4px;
`

const FriendName = ({ name }) => {
  const handleOpenChat = () => {
    console.log('open chat')
  }
  return (
    <FriendNameContainer>
      <Name>{name}</Name>
      <Icon
        onClick={() => handleOpenChat()}
        className="fa-solid fa-message"
        color={'156,255,217'}
      />
      <Icon className="fa-solid fa-trash" color={'181,5,5'} />
    </FriendNameContainer>
  )
}

export default FriendName
