import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../movies-api";

export const useFetchReviews = () => {
  const { movieId } = useParams();
  const [movieReviewsData, setMovieReviewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviewsData = async () => {
      setLoading(true);
      setError(null);
      if (!movieId) return;
      try {
        const reviewsData = await getMovieReviews(movieId);
        setMovieReviewsData(reviewsData.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getReviewsData();
  }, [movieId]);

  return {
    movieReviewsData,
    loading,
    error,
  };
};
