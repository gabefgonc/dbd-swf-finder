import styled from 'styled-components'

const Form = styled.div`
    a{
        color: ${props => props.theme.colors.text}
    }
    a:visited{
        color: ${props => props.theme.colors.text}
    }
    font-size: 15pt;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export default Form
