import styled from "styled-components"

export const AnimeCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const AnimeTitle = styled.h2`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  max-width: 90%;
  word-wrap: break-word;
`
