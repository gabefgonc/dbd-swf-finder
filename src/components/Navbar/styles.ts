import styled from 'styled-components'



export const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
    box-shadow: 0px 2px 2px 3px rgba(black, 0.2);
    font-size: 15pt;
    height: 50px;
    color: #333;

    padding: 10px;
`