import styled from 'styled-components';

export const AnimeContainer = styled.div`
    position: relative;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
`;


export const AnimeImage = styled.img`
    max-width: 100%;
    height: auto;
`;

export const AnimeTitle = styled.h2`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`;

export const AnimeDescription = styled.p`
    margin-top: 20px;
    font-size: 1.1rem;
    color: #666;
    line-height: 1.5;
`;

export const AnimeDate = styled.p`
    margin-top: 10px;
    font-size: 1rem;
    color: #888;
`;


export const BackButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    font-size: 1rem;
    color: #007bff;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    &:before {
        content: "← ";
    }
`;
