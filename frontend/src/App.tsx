import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/ChatPage";
import Albumpage from "./pages/Albumpage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/albums/:albumId" element={<Albumpage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
