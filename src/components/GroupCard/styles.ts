import styled from 'styled-components'

import { opacify } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
    background: ${props => props.theme.colors.secondaryBackground};
    width: 400px;
`

export const Code = styled.code`
    font-family: Consolas,"courier new";
    color: ${props => props.theme.colors.text};
    background-color: ${props => opacify(0.4, props.theme.colors.background)};
    padding: 2px;
    font-size: 105%;
    border-radius: 5px;
    max-width: 250px;
    word-break: break-all;
    margin-top: 0;
`

export const Title = styled.p`
    font-size: 20pt;
    font-weight: bold;
    margin: 0;
`

export const SubTitle = styled.p`
    font-size: 15pt;
    margin-top: 10px;
    margin-bottom: 5px;
`

export const CodeLink = styled.a`
    color: ${props => props.theme.colors.text};
    &:visited {
        color: ${props => props.theme.colors.text};
    }
`