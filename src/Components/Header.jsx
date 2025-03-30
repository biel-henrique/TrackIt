import styled from "styled-components";
import logo from "../assets/Images/logo.png"
import UserContext from "../Contexts/UserContext";
import { useContext } from "react";

export default function Header() {

    const [token, setToken, image, setImage] = useContext(UserContext)

    return (
        <Content>
            <h1>TrackIt</h1>
            <img src={image} alt="photo" />
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 15px;
    height: 70px;
    align-items: center;
    background-color: #126BA5;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 4px 4px 0px #00000026;
    border-radius: 0 0 5px 5px;

    img {
        width: 51px;
        height: 51px;
        border-radius: 99px;
        border: 1px solid black; // RETIRAR MAIS TARDE
    }

    h1 {
        font-family: "Playball", cursive;
        color: #ffffff;
        font-size: 40px;
        font-weight: 400;
    }
`