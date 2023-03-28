import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import App from 'App'
import ErrorBoundary from 'utils/ErrorBoundary'
import reportWebVitals from 'reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from 'context/AuthContext'
import { PlayerProvider } from 'context/PlayerContext'
import { ChatProvider } from 'context/ChatContext'
import ErrorProvider from 'context/ErrorContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ErrorProvider>
        <AuthProvider>
          <PlayerProvider>
            <ChatProvider>
              <CookiesProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </CookiesProvider>
            </ChatProvider>
          </PlayerProvider>
        </AuthProvider>
      </ErrorProvider>
    </ErrorBoundary>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
