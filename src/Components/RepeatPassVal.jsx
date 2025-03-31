import React from "react";
import styled from "styled-components";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

const RepeatPassVal = ({password, rptPass}) => {

    return (
        <Container>
            {password.trim() === rptPass.trim() ? (
                <Validation>
                    <h1>As senhas estão corretas!</h1>
                    <TaskAltIcon sx={{ fontSize: "20px", color: "#4CAF50" }} />
                </Validation>
            ) : (
                <Validation>
                    <h1>As senhas não correspondem</h1>
                    <DoNotDisturbAltIcon
                        sx={{ fontSize: "20px", color: "red" }}
                    />
                </Validation>
            )}
        </Container>
    );
};

export default RepeatPassVal;

const Validation = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
    width: 100%;
`;

const Container = styled.div`
    width: 100%;
`
