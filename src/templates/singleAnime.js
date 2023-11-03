import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import parse from 'html-react-parser';
import Seo from '../components/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
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

import { findImageByName } from '../utils/findImageByName';

const SingleAnime = ({
  data: {
    anilist: { Media: anime },
    allFile: { nodes: imagesData },
  },
}) => {
  const {
    id: currentId,
    title: { userPreferred },
    startDate,
    description,
  } = anime;

  const bannerImage = findImageByName(`banner_${currentId}`, imagesData);
  const coverImage = findImageByName(`cover_${currentId}`, imagesData);

  const formattedDate = `${startDate.year}-${startDate.month}-${startDate.day}`;

  return (
    <Layout currentId={currentId}>
      <Seo title={userPreferred} />
      <AnimeContainer>
        {bannerImage ? (
          <BannerContainer>
            <BannerImage image={bannerImage} alt={userPreferred} />
            <AnimeTitleOnBanner>{userPreferred}</AnimeTitleOnBanner>
            <BackButtonOnBanner onClick={() => window.history.back()}>Back</BackButtonOnBanner>
          </BannerContainer>
        ) : (
          <BackButton onClick={() => window.history.back()}>Back</BackButton>
        )}
        <AnimeTitle>{userPreferred}</AnimeTitle>
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
