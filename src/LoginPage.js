import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalStateContext } from './App';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: #8c6900;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginBox = styled.div`
    height: 500px;
    width: 80%;
    max-width: 600px;
    background: white;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
`;

const Input = styled.input`
    border-radius: 30px;
    border: 2px solid black;
    height: 50px;
    width: 50%;
    padding: 0 20px;
    font-size: 25px;
`;

const LoginButton = styled.button`
    border-radius: 30px;
    border: 2px solid black;
    height: 50px;
    width: 25%;
    padding: 0 20px 0 20px;
    font-size: 25px;
`;

const Logo = styled.img`
    width: 50%;
    margin-bottom: 25px;
`;

export default function LoginPage() {

    const { globalState, dispatch } = useContext(GlobalStateContext);

    return (
        <>
            <Container>
                <LoginBox>
                    <Logo src='/faradaiLogo.png' />
                    <Input
                        name='email'
                        type='email'
                        value={globalState.email}
                        onChange={e => dispatch({type: 'UPDATE_EMAIL', value: e.target.value})}
                        placeholder='Email Address'
                    />
                    <Input
                        name='password'
                        value={globalState.password}
                        type='password'
                        onChange={e => dispatch({type: 'UPDATE_PASSWORD', value: e.target.value})}
                        minLength="8"
                        placeholder='Password' />
                    <LoginButton>Login</LoginButton>
                </LoginBox>
            </Container>
        </>
    )
}
