import { useState, useEffect } from 'react'
import ModalContainer from 'components/ModalContainer'
import RequestBar from 'features/chat/components/RequestBar'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'

const RequestsContainer = styled.div`
  width: 88%;
  height: 80vh;
  background-color: var(--dark-blue);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  align-items: center;
  position: relative;
  margin-top: 10vh;
`
const Heading = styled.div`
  font-size: 1.4rem;
  margin-bottom: 30px;
`
const SectionTitle = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  font-size: 1.3rem;
  font-weight: 500;
  margin: 8px;
  padding: 0.3rem;
  border-radius: 5px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`
const CloseBtn = styled.i`
  color: var(--red);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.3rem;
  padding: 10px;
`
const RequestListContainer = styled.ul`
  width: 100%;
  overflow-y: scroll;
  margin: 0;
  padding: 0;
`

const ViewRequestsModal = ({ closeModal }) => {
  const { backendApiCall } = useAxios()
  const [sentRequests, setSentRequests] = useState([])
  const [recievedRequests, setRecievedRequests] = useState([])
  const getRequests = async () => {
    const config = {
      url: '/chat/requests',
    }
    const { data } = await backendApiCall(config)
    if (data.sentByUser.length) {
      setSentRequests(
        data.sentByUser.map((request) => {
          return (
            <RequestBar
              key={request.requestId}
              name={request.username}
              requestId={request.requestId}
              sentToUser={false}
              getRequests={getRequests}
            />
          )
        })
      )
    }
    if (data.sentToUser.length) {
      setRecievedRequests(
        data.sentToUser.map((request) => {
          return (
            <RequestBar
              key={request.requestId}
              name={request.username}
              requestId={request.requestId}
              sentToUser={true}
              getRequests={getRequests}
            />
          )
        })
      )
    }
  }
  const handleClose = () => {
    setSentRequests([])
    setRecievedRequests([])
    closeModal()
  }
  useEffect(() => {
    getRequests()
  }, [])
  return (
    <ModalContainer onClick={() => handleClose()}>
      <RequestsContainer>
        <CloseBtn onClick={() => handleClose()} className="fa-solid fa-x" />
        <Heading>your requests</Heading>
        {!!recievedRequests.length && (
          <SectionTitle>recieved requests</SectionTitle>
        )}
        <RequestListContainer>{recievedRequests}</RequestListContainer>
        {!!sentRequests.length && <SectionTitle>sent requests</SectionTitle>}
        <RequestListContainer>{sentRequests}</RequestListContainer>
      </RequestsContainer>
    </ModalContainer>
  )
}

export default ViewRequestsModal
