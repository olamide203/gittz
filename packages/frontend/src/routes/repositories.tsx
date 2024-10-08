import { useState, useEffect } from "react";
import Repository from "../components/Repository/Repository";
import RepoSkeleton from "../components/Repository/RepoSkeleton";
import Pagination from "../components/Pagination";
import { useRepositories } from "~/hooks/useRepositories";

export default ({ type }) => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(12);
  const handlePageChange = (e) => {
    setPage(e.selected + 1);
  };
  const {
    data: repositories,
    error,
    isLoading,
  } = useRepositories(page, limit, type);
  useEffect(() => {
    if (!repositories) {
      return setPageCount(0);
    }
    setPageCount(
      Math.ceil(repositories.pagination.total / repositories.pagination.limit),
    );
  }, [repositories]);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill grid-flow-row-dense">
        {repositories &&
          repositories.data.map((repository, index) => (
            <Repository item={repository} key={index} />
          ))}
        {isLoading &&
          [...Array(3)].map((item, index) => <RepoSkeleton key={index} />)}
      </div>
      <div className="grid justify-center mt-10">
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
