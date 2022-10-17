import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #374151;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.5s;

    @media (max-width: 750px) {
        width: 90%;
    }

    &:hover {
        background-color: #111827;
        transition: 0.5s;
    }
`;

export const IconArea = styled.div`
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(255,255,255, .3);
    padding: 0 15px;
`;

export const Icon = styled.img`
    height: 20px;
`;

export const Label = styled.div`
    color: #FFF;
    font-size: 1rem;
    display: flex
    justify-content: center;
    align-items: center;
    flex: 1;
    text-align: center;
`;