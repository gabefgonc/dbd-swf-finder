import styled from 'styled-components'

const Button = styled.button`
    border-radius: 20px;
    background-color: ${props => props.theme.colors.primary};
    color: #333;
    border: none;
    margin-top: 10px;
    width: 100px;
    height: 30px;
`

export default Button