import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import styled from "styled-components";

export default function PasswordValidationForm({pass}) {

    return (
        <Container>
            <Validation>
                <h1>A senha deve ter pelo menos 8 digitos</h1>
                {pass.size ? (
                    <TaskAltIcon sx={{ fontSize: "20px", color: "#4CAF50" }} />
                ) : (
                    <DoNotDisturbAltIcon
                        sx={{ fontSize: "20px", color: "red" }}
                    />
                )}
            </Validation>
            <Validation>
                <h1>A senha deve ter pelo menos um caractere especial</h1>
                {pass.special ? (
                    <TaskAltIcon sx={{ fontSize: "20px", color: "#4CAF50" }} />
                ) : (
                    <DoNotDisturbAltIcon
                        sx={{ fontSize: "20px", color: "red" }}
                    />
                )}
            </Validation>
            <Validation>
                <h1>A senha deve conter pelo menos uma letra minuscula</h1>
                {pass.lower ? (
                    <TaskAltIcon sx={{ fontSize: "20px", color: "#4CAF50" }} />
                ) : (
                    <DoNotDisturbAltIcon
                        sx={{ fontSize: "20px", color: "red" }}
                    />
                )}
            </Validation>
            <Validation>
                <h1>A senha deve conter pelo menos uma letra maiuscula</h1>
                {pass.upper ? (
                    <TaskAltIcon sx={{ fontSize: "20px", color: "#4CAF50" }} />
                ) : (
                    <DoNotDisturbAltIcon
                        sx={{ fontSize: "20px", color: "red" }}
                    />
                )}
            </Validation>
            <Validation>
                <h1>A senha deve conter pelo menos um numero</h1>
                {pass.number ? (
                    <TaskAltIcon sx={{ fontSize: "20px", color: "#4CAF50" }} />
                ) : (
                    <DoNotDisturbAltIcon
                        sx={{ fontSize: "20px", color: "red" }}
                    />
                )}
            </Validation>
        </Container>
    );
}

const Validation = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
