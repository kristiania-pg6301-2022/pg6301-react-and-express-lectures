import { useState } from "react";

export function useSubmit(loadFn) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(undefined);

  async function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    setError(undefined);
    setSubmitting(true);
    try {
      await loadFn();
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  }

  return { handleSubmit, submitting, error };
}
