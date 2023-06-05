import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0; 
        font-family: "Plus Jakarta Sans", sans-serif;
    }

    .center-align-vertical {
       display: flex; 
       align-items: center;
    }

    .container {
        max-width: 95%;
        margin-left: auto;
        margin-right: auto;
        
    }
`;

export default GlobalStyles;
