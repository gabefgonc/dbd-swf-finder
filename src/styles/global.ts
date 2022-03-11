import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body{
        padding-top: 90px;
        font-family: Roboto;
        background-color: ${props => props.theme.colors.background};
        margin: 0;
        color: ${props => props.theme.colors.text}

    }
`
export default GlobalStyle