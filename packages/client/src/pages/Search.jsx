import React, { useContext, useState, useEffect } from "react";
import useDebounce from "../Hooks/useDebounce";
import SearchForm from "../components/Search/Form";
import useSWR from "swr";
import SearchContext from "../context/SearchContext";
import User from "../components/User/User";
import Repository from "../components/Repository/Repository";
import Pagination from "../components/Pagination";
import RepoSkeleton from "../components/Repository/RepoSkeleton";

const constructQuery = (filters) => {
  const { organization, username, ...rest } = filters;
  const modifiedFilters = { ...rest, org: organization, user: username };
  return Object.entries(modifiedFilters).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    return acc + encodeURIComponent(` ${key}:${value}`);
  }, "");
};

function Search() {
  const { searchState } = useContext(SearchContext);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // debounce searchterm to preevent hitting the API more times than needed
  const debouncedSearch = useDebounce(searchState, 700);

  const key = debouncedSearch.searchTerm
    ? [
        `/search/${debouncedSearch.category}?q=${debouncedSearch.searchTerm}` +
          constructQuery(debouncedSearch.filters) +
          `&page=${currentPage}&limit=${limit}`,
        { method: "GET", credentials: "include" },
      ]
    : null;

  const { data: result, isValidating, error } = useSWR(key);
  useEffect(() => {
    if (result) {
      result.data.total_count < 1000
        ? setPageCount(Math.ceil(result.data.total_count / limit))
        : setPageCount(Math.ceil(1000 / limit));
    } else {
      setPageCount(0);
    }
  }, [result]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div className="p-4 sm:p-10 text-white h-screen overflow-scroll">
      <SearchForm />

      {result && (
        <h2 className="my-5 text-xl font-bold">
          {new Intl.NumberFormat({ notation: "standard" }).format(
            result.data.total_count
          )}{" "}
          Results
        </h2>
      )}
      {debouncedSearch.category === "users" && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill-2 md:grid-cols-auto-fill grid-flow-row-dense">
          {result &&
            result.data.items.map((item, index) => (
              <User key={index} username={item.login} />
            ))}
        </div>
      )}
      {debouncedSearch.category === "repositories" && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill grid-flow-row-dense">
          {debouncedSearch.category === "repositories" &&
            result &&
            result.data.items.map((item, index) => (
              <Repository key={index} item={item} mutateKey={key} />
            ))}
        </div>
      )}
      {isValidating && !result && debouncedSearch.category === "repositories" && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill grid-flow-row-dense mt-10">
          {[...Array(6)].map((item, index) => (
            <RepoSkeleton key={index} />
          ))}
        </div>
      )}
      <div className="grid justify-center mt-10">
        <Pagination
          onPageChange={handlePageChange}
          pageCount={pageCount}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Search;
