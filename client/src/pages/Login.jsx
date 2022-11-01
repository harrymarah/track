import React from 'react'
import styled from 'styled-components'
import trackLogo from 'assets/track.png'
import spotifyLogo from 'assets/Spotify_Logo_RGB_Green.png'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background-color: var(--dark-blue);
  color: var(--light);
  line-height: 1.3;
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 2.5rem;
  margin: 0;
`

const Logo = styled.span`
  display: inline-block;
  background-image: url(${trackLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100%;
  width: 100px;
`

const Tagline = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  margin: 0;
`

const Text = styled.p`
  margin: 0;
  line-height: 1.2;
`

const LoginBtn = styled.a`
  cursor: pointer;
  color: var(--black);
  background-color: var(--light);
  border-radius: 50px;
  text-align: center;
  text-decoration: none;
  padding: 1rem;
  width: 50%;
  align-self: center;
  margin-top: 150px;
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.5));
  -webkit-box-shadow: 0 0 40px rgba(255, 255, 255, 0.5));
  -moz-box-shadow: 0 0 40px rgba(255, 255, 255, 0.5));
`

const SpotifyLogo = styled(Logo)`
  background-image: url(${spotifyLogo});
  height: 25px;
  margin-bottom: -6px;
`

const Link = styled.a`
  color: var(--green);
  align-self: center;
  text-align: center;
  margin-top: 0.8rem;
`

const Login = () => {
  return (
    <Wrapper>
      <Title>
        welcome to <Logo />
      </Title>
      <Tagline>the streaming chat app</Tagline>
      <Text>login with spotify to get started</Text>
      <LoginBtn href={process.env.REACT_APP_SERVER_URL + '/auth/spotify'}>
        login with <SpotifyLogo />
      </LoginBtn>
      <Link>learn more</Link>
    </Wrapper>
  )
}

export default Login
