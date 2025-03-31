import { useContext, useState } from "react";
import logo from "../assets/Images/logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { SyncLoader } from "react-spinners";
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function Singup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [token, setToken, image, setImage] = useContext(UserContext);

    const { enqueueSnackbar } = useSnackbar();

    const snack = (err) => {
        enqueueSnackbar(err, {
            variant: "error",
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            email,
            name,
            image,
            password,
        };

        axios
            .post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
                body
            )
            .then(() => {
                navigate("/")
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                snack(err.response.data.message)
            });
    };

    return (
        <Content>
            <Logo>
                <img src={logo} alt="" />
            </Logo>
            <Form onSubmit={submitForm}>
                <Input>
                    <input
                        type="email"
                        value={email}
                        id="email"
                        placeholder="Digite seu E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading ? true : false}
                        required
                    />
                </Input>
                <Input>
                    <input
                        type="password"
                        value={password}
                        id="password"
                        placeholder="Digite sua Senha"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading ? true : false}
                        required
                    />
                </Input>
                {/* <Input>
                    <input
                        type="password"
                        value={repeatPassword}
                        id="repeatPassword"
                        placeholder="Repita sua Senha"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        disabled={isLoading ? true : false}
                        required
                    />
                </Input> */}
                <Input>
                    <input
                        type="name"
                        value={name}
                        id="name"
                        placeholder="Digite seu Nome"
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading ? true : false}
                        required
                    />
                </Input>
                <Input>
                    <input
                        label="photo"
                        type="text"
                        value={image}
                        id="photo"
                        placeholder="Foto"
                        onChange={(e) => setImage(e.target.value)}
                        disabled={isLoading ? true : false}
                    />
                </Input>
                <Enter type="submit">
                    {!isLoading ? (
                        "Cadastrar"
                    ) : (
                        <SyncLoader size={8} color="gray" />
                    )}
                </Enter>
            </Form>
            <Singin to={`/`}>Já tem uma conta? Faça o Login!</Singin>
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

    input {
        width: 70%;
        height: 45px;
        padding: 15px;
        border: 1px solid #d4d4d4;
        border-radius: 10px;
        outline: none;
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
    }
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

const Singin = styled(Link)``;
