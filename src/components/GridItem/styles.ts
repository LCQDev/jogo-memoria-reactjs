import styled from "styled-components";

type ContainerProps = {
    showBkg: boolean;
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBkg ? '#1550FF' : '#cccccc'};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    width:100px;
    height: 100px;

    @media (max-width: 750px) {
        width:80px;
        height: 80px;
        margin-top: 2rem;
    }
`;

type IconProps = {
    opacity?: number;
}

export const Icon = styled.img<IconProps>`
    max-width: 50%;
    opacity: ${props => props.opacity ?? 1};
`;