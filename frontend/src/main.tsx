import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@radix-ui/themes/styles.css";
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {Theme} from "@radix-ui/themes";
import {Login} from "./pages/auth/Login";
import {SignUp} from "./pages/auth/SignUp";
import {RecoveryPassword} from "./pages/auth/RecoveryPassword";
import {ChangePassword} from "./pages/auth/ChangePassword";
import {Dashboard} from "./pages/app/Dashboard";
import {NotesProvider} from "./contexts/NotesContext.tsx";
import {AuthenticationPage} from "./pages/auth/AuthenticationPage";
import {NotAuthenticationPage} from "./pages/auth/NotAuthenticationPage";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Theme>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<App/>}/>
                  <Route element={<NotAuthenticationPage/>}>
                      <Route path={"auth"}>
                          <Route path={"login"} element={<Login/>}/>
                          <Route path={"signup"} element={<SignUp/>}/>
                          <Route path={"password"}>
                              <Route path={"recovery"} element={<RecoveryPassword/>}/>
                              <Route path={"change"} element={<ChangePassword/>}/>
                          </Route>
                      </Route>
                  </Route>
                  <Route element={<AuthenticationPage/>} path={"app"}>
                      <Route index element={
                          <NotesProvider>
                              <Dashboard/>
                          </NotesProvider>
                      } />
                  </Route>
              </Routes>
          </BrowserRouter>
      </Theme>
  </StrictMode>,
)
