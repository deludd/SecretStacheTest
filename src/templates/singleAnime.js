import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import parse from 'html-react-parser';
import Seo from '../components/seo';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  AnimeContainer,
  AnimeTitle,
  BannerContainer,
  BannerImage,
  AnimeDate,
  AnimeDescription,
  BackButton,
  BackButtonOnBanner,
  AnimeTitleOnBanner,
} from '../styles/SingleAnimePageStyles';
import animeData from '../../public/animeData.json';

const SingleAnime = ({
  data: {
    anilist: { Media: anime },
    allFile: { nodes: imagesData }
  },
}) => {
  const {
    id: currentId,
    title: { userPreferred },
    startDate,
    description,
  } = anime;

  const localAnimeData = animeData.find(a => a.id === currentId);
  if (!localAnimeData) {
    console.error(`No local data found for anime ID: ${currentId}`);
  }

  const findImageByName = name => {
    const fileNode = imagesData.find(node => node.name === name);
    return fileNode ? getImage(fileNode) : null;
  };

  const bannerImage = findImageByName(`banner_${currentId}`);
  const coverImage = findImageByName(`cover_${currentId}`);

  const formattedDate = `${startDate.year}-${startDate.month}-${startDate.day}`;

  return (
    <Layout currentId={currentId}>
      <Seo title={userPreferred} />
      <AnimeContainer>
        {bannerImage ? (
          <>
            <BannerContainer>
              <BannerImage image={bannerImage} alt={userPreferred} />
              <AnimeTitleOnBanner>{userPreferred}</AnimeTitleOnBanner>
              <BackButtonOnBanner onClick={() => window.history.back()}>Back</BackButtonOnBanner>
            </BannerContainer>
          </>
        ) : (
          <>
            <BackButton onClick={() => window.history.back()}>Back</BackButton>
            <AnimeTitle>{userPreferred}</AnimeTitle>
          </>
        )}
        <GatsbyImage image={coverImage} alt={userPreferred} />
        <AnimeDate>Start Date: {formattedDate}</AnimeDate>
        <AnimeDescription>{description ? parse(description) : ''}</AnimeDescription>
      </AnimeContainer>
    </Layout>
  );
};

export default SingleAnime;

export const pageQuery = graphql`
  query ($id: Int!) {
    anilist {
      Media(id: $id) {
        id
        title {
          userPreferred
        }
        startDate {
          year
          month
          day
        }
        description
      }
    }
    allFile(filter: { extension: { regex: "/(jpg|jpeg|png)/" }, sourceInstanceName: { eq: "images" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
`;
