import styled from 'styled-components'
import { shade } from 'polished'

const Input = styled.input`
    outline: none;
    border: none;
    border-radius: 10px;
    width: 250px;
    height: 30px;
    color: ${props => props.theme.colors.text};
    background-color: ${props => shade(0.25, props.theme.colors.background)};
    &:hover{
        background-color: ${props => shade(0.15, props.theme.colors.background)}
    }
`

export default Input