import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Button, DialogContent, Dialog } from '@material-ui/core';

export const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    width: 99vw;
    margin: 0 auto;
    align-items: center;
  }
`

export const MainApp = styled.div`
  
    
`

export const DisplayApp = styled.div`
    display: ${props => props.display};
    position: fixed;
    z-index: 1;
    padding-top: 100px; 
    padding-left: 100px; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);
    & .displayApp_wrapp {
        background-color: #fff;
        height: ${props => props.height};
        width: ${props => props.width};
        width: 100%; 
    }
    & span {
        position: relative;
        cursor: pointer;
        font-size: 0;
        &::after, ::before {
            content: '';
           position: absolute;
           width: 20px;
           height: 4px;
           background: #000; 
           top: -5px;
           left: 220px;
           transform: rotate(45deg);
        }
        &::before{
            transform: rotate(-45deg);
        }
    }
`



export const ButtonStyle = styled(Button)`
    && {
        color: #fff;
        background: #5D6364;
        
        border: 0;
        height: 35px;
        width: ${props => props.width};
        margin-bottom: 10px;
        text-transform: none;
        padding: 0 15px;
       
    }
    
    
    /* position: relative;
    font-size: 0;
    border: none;
    &:active, :focus, :hover {
        outline: 0;
        outline-offset: 0;
    }
    
    &::after, ::before {
            content: '';
           position: absolute;
           width: 20px;
           height: 4px;
           background: #8a8a8a; 
           top: 50px;
           left: 50px;
           z-index:5;
           
        }
        &::before{
            transform: rotate(90deg);
        } */
    
`

export const EditForm = styled.form`
display: ${props => props.display};
position: fixed;
z-index: 1;
padding-top: 100px; 
padding-left: 100px; 
left: 0;
top: 0;
width: 100%; 
height: 100%; 
overflow: auto; 
background-color: rgb(0,0,0); 
background-color: rgba(0,0,0,0.4);
& .editForm_wrapp {
    background-color: #fff;
    height: 50%;
    width: 250px; 
}

`

export const Disp = styled(DialogContent)`
    && {
        display: flex;
        flex-direction: column;
        
        & select {
            margin: 10px 0;
            height: 25px;
            font-size: 14px;
        }
    }


`

export const DialogStyle = styled(Dialog)`
    && {
        width: 1400px;
        
        
    }


`

export const Nav = styled.nav`
   display: flex;
   z-index: 2;
   margin-top: 20px;
   position: absolute;
   
   top: -10px;
   left: 20px;

   & .nav_item{
       margin-right: 20px;
   }
`

export const Chart_wrapp = styled.section`
  margin-top: 20px;
  position: relative;
`  