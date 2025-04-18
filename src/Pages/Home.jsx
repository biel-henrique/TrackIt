import { useContext, useState } from "react";
import logo from "../assets/Images/logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { SyncLoader } from "react-spinners";
import { SnackbarProvider, useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [token, setToken, image, setImage] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const snack = (errorMessage) => {
        enqueueSnackbar(errorMessage, {
            variant: "error",
        });
    };

    const sendLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            email,
            password,
        };

        axios
            .post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
                body
            )
            .then((res) => {
                setIsLoading(false);
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                setImage(res.data.image);
                localStorage.setItem("img", res.data.image);
                navigate("/hoje");
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMessage(err.response.data.message);
                snack(errorMessage);
            });
    };

    return (
        <Content>
            <Logo>
                <img src={logo} alt="" />
            </Logo>
            <Form onSubmit={sendLogin}>
                <Input>
                    <TextField
                        type="email"
                        value={email}
                        className="outlined-required"
                        label="Digite seu E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading ? true : false}
                        sx={{ width: "70%", fontSize: "16px", '& .MuiInputBase-root': {height: "50px"}}}
                    />
                </Input>
                <Input>
                    <TextField
                        type="password"
                        value={password}
                        className="outlined-required"
                        label="Digite sua Senha"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading ? true : false}
                        sx={{ width: "70%", fontSize: "16px", '& .MuiInputBase-root': {height: "50px"}}}
                    />
                </Input>
                <Enter>
                    {!isLoading ? (
                        "Entrar"
                    ) : (
                        <SyncLoader size={8} color="gray" />
                    )}
                </Enter>
            </Form>
            <Singup to={`/cadastro`}>Não tem conta? Cadastre-se!</Singup>
        </Content>
    );
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

const Logo = styled.div`
    img {
        width: 180px;
        height: 178px;
    }
`;

const Form = styled.form`
    gap: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const Enter = styled.button`
    width: 70%;
    height: 45px;
    padding: 15px;
    background-color: #52b6ff;
    border-radius: 10px;
`;

const Input = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Singup = styled(Link)``;
