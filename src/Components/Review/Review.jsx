import React, { useState, useEffect } from 'react';
import { URL } from '../../config';

const Stars = ({ score }) => {
  const filledStars = Math.floor(score);
  const halfStar = score % 1 !== 0;

  const starArray = Array.from({ length: 5 }, (_, index) => {
    if (index < filledStars) {
      return '★'; // Filled star
    } else if (index === filledStars && halfStar) {
      return '☆'; // Half-filled star
    } else {
      return '☆'; // Empty star
    }
  });

  return <span>{starArray.join(' ')}</span>;
};

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    fetch(`${URL}Reviews/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
        setAverageScore(data.averageScore);
      })
      .catch((error) => console.error('Error:', error));
  }, [productId]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (reviews && reviews.length > 0) {
        await fetch(`${URL}Product/${reviews[0]?.ProductId}`)
          .then((response) => response.json())
          .then((data) => setAverageScore(data.averageScore.toFixed(2)))
          .catch((error) => console.error('Error fetching score data:', error));
      }
    };

    fetchUsers();
  }, [reviews]);

  useEffect(() => {
    if (reviews) {
      const fetchUsers = async () => {
        await Promise.all(
          reviews.map((review) =>
            fetch(`${URL}User/${review.UserId}`)
              .then((response) => response.json())
              .then((data) => setUsers((prevUsers) => [...prevUsers, data.user.firstName]))
              .catch((error) => console.error('Error fetching user data:', error))
          )
        );
      };

      fetchUsers();
    }
  }, [reviews]);

  return (
    <div>
      <h2>
        Puntaje: <Stars score={averageScore} />
      </h2>
      <h3>Comentarios:</h3>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={review.id}>
              <p>{review.description}</p>
              <p>{users[index]}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios disponibles.</p>
      )}
    </div>
  );
};

export default Reviews;




// import React, { useState, useEffect } from 'react';
// import { URL } from '../../config';

// const Reviews = ({ productId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [averageScore, setAverageScore] = useState(0);

//   useEffect(() => {
//     fetch(`${URL}Reviews/${productId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setReviews(data.reviews);
//         setAverageScore(data.averageScore);
//       })
//       .catch((error) => console.error('Error:', error));
//   }, [productId]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (reviews && reviews.length > 0) {
//         await fetch(`${URL}Product/${reviews[0]?.ProductId}`)
//           .then((response) => response.json())
//           .then((data) => setAverageScore(data.averageScore.toFixed(2)))
//           .catch((error) => console.error('Error fetching score data:', error));
//       }
//     };
  
//     fetchUsers();
//   }, [reviews]);

//   console.log(reviews)

//   useEffect(() => {
//     if (reviews) {
//       const fetchUsers = async () => {
//         await Promise.all(
//           reviews.map((review) =>
//             fetch(`${URL}User/${review.UserId}`)
//               .then((response) => response.json())
//               .then((data) => setUsers((prevUsers) => [...prevUsers, data.user.firstName]))
//               .catch((error) => console.error('Error fetching user data:', error))
//           )
//         );
//       };

//       fetchUsers();
//     }
//   }, [reviews]);

//   return (
// <div>
//   <h2>Puntaje: {averageScore}/5</h2>
//   <h3>Comentarios:</h3>
//   {reviews && reviews.length > 0 ? (
//     <ul>
//       {reviews.map((review, index) => (
//         <li key={review.id}>
//           <p>{review.description}</p>
//           <p>{users[index]}</p>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <p>No hay comentarios disponibles.</p>
//   )}
// </div>
//   );
// };

// export default Reviews;

