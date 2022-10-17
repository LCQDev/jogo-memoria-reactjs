import styled from "styled-components";

export const Container = styled.div`
    max-width: 750px;
    margin: 0 auto;
    display: flex;
    padding: 50px 2rem;
    background-color: #FFF;

    @media (max-width: 750px) {
        flex-direction: column;
        padding: 50px 1rem;
        margin: 0 1rem;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;

    @media (max-width: 750px) {
        margin-botton: 50px;
        align-items: center;
    }
`;

export const GridArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 750px) {
        justify-content: center;
        margin: 0 20px;
    }
`;

export const LogoLink = styled.a`
    display: block;
`;

export const InfoArea = styled.div`
    width: 100%;
    margin: 10px 0;

    @media (max-width: 750px) {
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;