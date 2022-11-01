import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    --black: #171738;
    --dark-blue: #011638;
    --light: #E6F1FF;
    --bright: #9CFFD9;
    --green: #4FE383;
  }
  body{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--dark-blue);
    color: var(--light);
    box-sizing: border-box;
  }
`
export default GlobalStyle
