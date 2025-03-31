import { useContext, useEffect, useState } from "react";
import logo from "../assets/Images/logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { SyncLoader } from "react-spinners";
import { SnackbarProvider, useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import PasswordValidationForm from "../Components/PasswordValidationForm";
import RepeatPassVal from "../Components/RepeatPassVal";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Singup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorInput, setErrorInput] = useState(false);
    const [valPassword, setValPassword] = useState(false);
    const [valRptPass, setValRptPass] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pass, setPass] = useState({
        size: false,
        special: false,
        upper: false,
        lower: false,
        number: false,
    });

    const navigate = useNavigate();
    const [token, setToken, image, setImage] = useContext(UserContext);

    useEffect(() => {
        setImage('')
        localStorage.removeItem('img')
      }, []
    );

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
                navigate("/");
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                snack(err.response.data.message);
            });
    };

    const passwordValidation = (password) => {
        setPass((prev) => ({
            ...prev,
            size: password.length >= 8,
            special: /[!@#$%^&*]/.test(password),
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
        }));
    };

    return (
        <Content>
            <Logo>
                <img src={logo} alt="" />
            </Logo>
            <Form onSubmit={submitForm}>
                <Input>
                    <TextField
                        type="email"
                        value={email}
                        className="outlined-required"
                        label="Digite seu E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading ? true : false}
                        sx={{
                            width: "100%",
                            fontSize: "16px",
                            "& .MuiInputBase-root": { height: "50px" },
                        }}
                        required
                    />
                </Input>
                <InputPass>
                    <TextField
                        error={errorInput}
                        type={visible ? "text" : "password"}
                        value={password}
                        className="outlined-required"
                        label="Digite sua Senha"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            passwordValidation(e.target.value);
                        }}
                        disabled={isLoading ? true : false}
                        sx={{
                            width: "100%",
                            fontSize: "16px",
                            "& .MuiInputBase-root": { height: "50px" },
                        }}
                        required
                        onFocus={() => setValPassword(true)}
                    />
                    <TypeChange>
                        {!visible ? (
                            <VisibilityOffIcon
                                onClick={() => setVisible(true)}
                            />
                        ) : (
                            <VisibilityIcon onClick={() => setVisible(false)} />
                        )}
                    </TypeChange>
                </InputPass>
                {valPassword && (
                    <Val>
                        <PasswordValidationForm pass={pass} />
                    </Val>
                )}
                <Input>
                    <TextField
                        error={errorInput}
                        type="password"
                        value={repeatPassword}
                        className="outlined-required"
                        label="Repita sua Senha"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        disabled={
                            isLoading ||
                            !pass.lower ||
                            !pass.number ||
                            !pass.size ||
                            !pass.special ||
                            !pass.upper
                                ? true
                                : false
                        }
                        sx={{
                            width: "100%",
                            fontSize: "16px",
                            "& .MuiInputBase-root": { height: "50px" },
                        }}
                        onFocus={() => setValRptPass(true)}
                        required
                    />
                </Input>
                {valRptPass && (
                    <Val>
                        <RepeatPassVal
                            password={password}
                            rptPass={repeatPassword}
                        />
                    </Val>
                )}
                <Input>
                    <TextField
                        type="name"
                        value={name}
                        className="outlined-required"
                        label="Digite seu Nome"
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading ? true : false}
                        sx={{
                            width: "100%",
                            fontSize: "16px",
                            "& .MuiInputBase-root": { height: "50px" },
                        }}
                        required
                    />
                </Input>
                <Input>
                    <TextField
                        type="text"
                        value={image}
                        className="outlined-required"
                        label="Foto"
                        onChange={(e) => setImage(e.target.value)}
                        disabled={isLoading ? true : false}
                        sx={{
                            width: "100%",
                            fontSize: "16px",
                            "& .MuiInputBase-root": { height: "50px" },
                        }}
                        required
                    />
                </Input>
                <Enter
                    type="submit"
                    disabled={
                        !pass.lower ||
                        !pass.number ||
                        !pass.size ||
                        !pass.special ||
                        !pass.upper ||
                        password !== repeatPassword
                    }
                >
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

const TypeChange = styled.div`
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
`;

const Val = styled.div`
    width: 100%;
`

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
    width: 70%;
    align-items: start;
    justify-content: center;

    h1 {
        font-size: 15px;
        font-weight: 300;
        color: #666666;
    }
`;

const Enter = styled.button`
    width: 100%;
    height: 45px;
    padding: 15px;
    background-color: #52b6ff;
    border-radius: 10px;
    background-color: ${(props) => (props.disabled ? "#ccc" : "#52b6ff")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: background-color 0.5s;
`;

const Input = styled.div`
    width: 100%;
`;

const Singin = styled(Link)``;

const InputPass = styled.div`
    width: 100%;
    position: relative;

    .MuiOutlinedInput-root {
        padding-right: 30px; /* Espaço para o ícone */
    }
`;
