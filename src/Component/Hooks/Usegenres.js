const Usegenres = (selectedgenres) => {
  if (selectedgenres < 1) return "";

  const GenreIds = selectedgenres.map((g) => g.id);
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
};

export default Usegenres;
