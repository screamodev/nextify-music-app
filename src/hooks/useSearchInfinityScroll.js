import { useCallback, useEffect, useRef, useState } from "react";

export function useSearchInfinityScroll(
  searchInputValue,
  pageNumber,
  setPageNumber,
  sortState,
  fetchItems
) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setItems([]);
    setPageNumber(1);
  }, [searchInputValue, sortState]);

  useEffect(() => {
    setIsLoading(true);
    fetchItems({ searchInputValue, pageNumber, sortState }).then(({ data }) => {
      setItems((prevState) => [...prevState, ...data]);
      setHasMore(data.length > 0);
      setIsLoading(false);
    });
  }, [searchInputValue, pageNumber, sortState]);

  const observer = useRef();
  const lastSongElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  return { isLoading, items, lastSongElementRef };
}
