import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
background: url(../background-top.png);
background-position: center;
background-size: cover;
width: 100%;
height: 250px;
margin: 0 auto;
display: flex;
`;

const TextContainer = styled.div`
margin: 77px 0 69px 24px;
`;

const H1 = styled.h1`
color: #000;
margin-left: 24px;
`;

const H2 = styled.h2`
color: #000;
margin-left: 24px;
margin-top: 45px;
width: 70%;
`;

const GreenTop = () => {

  return (
    <Background>
        <TextContainer>
            <H1>Planta Mera!</H1>
            <H2>Sign in and continue collect your points</H2>
        </TextContainer>
    </Background>
  )
}

export default GreenTop