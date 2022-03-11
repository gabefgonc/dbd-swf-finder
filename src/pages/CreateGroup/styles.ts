import styled from 'styled-components'

import { shade } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const SubTitle = styled.p`
    font-size: 15pt;
    margin-top: 10px;
    margin-bottom: 5px;
`

export const TextArea = styled.textarea`
    outline: none;
    border: none;
    border-radius: 10px;
    width: 250px;
    height: 150px;
    color: ${props => props.theme.colors.text};
    background-color: ${props => shade(0.25, props.theme.colors.background)};
    &:hover{
        background-color: ${props => shade(0.15, props.theme.colors.background)}
    }
`