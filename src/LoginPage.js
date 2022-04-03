import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalStateContext } from './App';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(-45deg, #000000, #5588ff, #3dedff, #23a6d5, #49ffff, #ffffff);
	background-size: 200% 200%;
	animation: gradient 15s ease infinite;
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
`;

const LoginBox = styled.form`
    height: 500px;
    width: 80%;
    max-width: 600px;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    background: rgba(0,0,0,0.7);
    backdrop-filter: saturate(180%) blur(10px);
`;

const Input = styled.input`
    border-radius: 30px;
    background: rgba(0,0,0,0.7);
    backdrop-filter: saturate(180%) blur(10px);
    border: none;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: white;
    width: 50%;
    padding: 0 20px;
    font-size: 25px;
`;

const LoginButton = styled.button`
    border-radius: 30px;
    background: rgba(0,0,0,0.7);
    backdrop-filter: saturate(180%) blur(10px);
    color: white;
    border: none;
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

    const handleAuth = e => {
        e.preventDefault();
        dispatch({ type: 'CHECK_CREDENTIALS' });
    }

    return (
        <>
            <Container>
                <LoginBox onSubmit = {handleAuth} >
                    <Logo src='/faradaiLogo.png' />
                    <Input
                        name='email'
                        type='email'
                        value={globalState.email}
                        onChange={e => dispatch({ type: 'UPDATE_EMAIL', value: e.target.value })}
                        placeholder='Email Address'
                    />
                    <Input
                        name='password'
                        value={globalState.password}
                        type='password'
                        onChange={e => dispatch({ type: 'UPDATE_PASSWORD', value: e.target.value })}
                        minLength="8"
                        placeholder='Password' />
                    <LoginButton>Login</LoginButton>
                </LoginBox>
            </Container>
        </>
    )
}
