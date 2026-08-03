function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div>
      {Array.from(
        { length: totalPages },
        (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        }
      )}
    </div>
  );
}

export default Pagination;