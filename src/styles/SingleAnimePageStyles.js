import styled from 'styled-components';

export const AnimeContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

export const BannerContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  margin: -20px -20px 20px -20px;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const AnimeTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin: 20px 0;
  text-shadow: none;
  position: relative;
`;

export const BackButton = styled.span`
  font-size: 1rem;
  color: #007bff;
  cursor: pointer;
  display: block;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-5px);
  }

  &:before {
    content: '← ';
  }
`;

export const BackButtonOnBanner = styled(BackButton)`
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const AnimeTitleOnBanner = styled(AnimeTitle)`
  position: absolute;
  bottom: 0px;
  left: 20px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const AnimeImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin-top: 20px;
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
