import { useState } from "react";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Singup from "./Pages/Singup";
import Habits from "./Pages/Habits";
import UserContext from "./Contexts/UserContext";
import TodayList from "./Pages/TodayList";
import { SnackbarProvider } from "notistack";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [image, setImage] = useState(null);

    return (
        <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            style={{marginBottom:'70px'}}
        >
            <UserContext.Provider value={[token, setToken, image, setImage]}>
                <BrowserRouter>
                    <GlobalStyle />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cadastro" element={<Singup />} />
                        <Route path="/habitos" element={<Habits />} />
                        <Route path="/hoje" element={<TodayList />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </SnackbarProvider>
    );
}
