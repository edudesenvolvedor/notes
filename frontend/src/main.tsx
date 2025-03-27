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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Theme>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<App/>}/>
                  <Route path={"auth"}>
                      <Route path={"login"} element={<Login/>}/>
                      <Route path={"signup"} element={<SignUp/>}/>
                      <Route path={"password"}>
                          <Route path={"recovery"} element={<RecoveryPassword/>}/>
                          <Route path={"change"} element={<ChangePassword/>}/>
                      </Route>
                  </Route>
              </Routes>
          </BrowserRouter>
      </Theme>
  </StrictMode>,
)
