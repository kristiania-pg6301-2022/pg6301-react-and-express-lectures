import { useEffect, useState } from "react";

export function useLoading(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  function load() {
    setLoading(true);
    const promise = loadingFunction();
    promise
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  return { loading, error, data };
}
