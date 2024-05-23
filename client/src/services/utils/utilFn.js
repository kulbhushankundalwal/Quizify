export const formatCreatedAt = (date) => {
  // Assuming createdAt is a valid Date object or a string
  //
  const createdAt = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return createdAt;
};
