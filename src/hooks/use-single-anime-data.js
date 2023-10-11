// import { graphql, useStaticQuery } from 'gatsby';

// const useCustomStaticQuery = (id) => {
//   const data = useStaticQuery(graphql`
//     query CustomQuery($id: Int!) { 
//       anilist {
//         Media(id: $id) {
//           id
//           title {
//             romaji
//           }
//           coverImage {
//             large
//           }
//           startDate {
//             year
//             month
//             day
//           }
//           description
//         }
//       }
//     }
//   `, { variables: { id } });
  
//   return data;
// };

// export default useCustomStaticQuery;
