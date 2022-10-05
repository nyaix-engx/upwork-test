import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { request } from "@helpers/request";

import Icon from "@components/Icon";
import InputSearch from "@components/InputSearch";
import Card from "@components/Card";
import LoaderWrapper from "@components/LoaderWrapper";
import Pagination from "@components/Pagination";

import styles from "@styles/pages/_search.module.scss";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [apiData, setApiData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (router?.query && router.query?.search) {
      setSearchTerm(router.query.search);
    }
  }, [router]);

  useEffect(() => {
    if (searchTerm) {
      getPhotos();
    }
  }, [searchTerm, currentPage]);

  const getPhotos = async () => {
    setIsDataLoaded(false);
    try {
      const res = await request({
        url: `search/photos?query=${searchTerm}&page=${currentPage}`,
        method: "GET",
      });
      if (res.status) {
        setApiData({
          photos: res?.data?.results,
          totalResults: res?.data?.total,
          totalPages: res?.data?.total_pages,
        });
      } else {
        setIsError(true);
        setErrorMessage(
          res?.data?.message || "An error occured while fetching data."
        );
      }
    } catch (err) {
      setIsError(true);
      setErrorMessage(err?.message || "An error occured while fetching data.");
    } finally {
      setIsDataLoaded(true);
    }
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["layout-header"]}>
        <div
          className={styles["layout-header--arrow"]}
          role="presentation"
          onClick={() => router.back()}
        >
          <Icon icon="arrow-left" size="20px" />
        </div>
        <div className={styles["layout-header--wrapper"]}>
          <div className={styles["layout-header-title"]}>Search results</div>
          <div className={styles["layout-header-search"]}>
            <InputSearch
              onChange={(e) => setSearchTerm(e.target.value)}
              onSubmit={() => {}}
              value={searchTerm}
            />
          </div>
        </div>
      </div>
      <div className={styles["layout-content"]}>
        <LoaderWrapper
          isDataLoaded={isDataLoaded}
          isError={isError}
          errorMessage={errorMessage}
        >
          {isDataLoaded && (
            <>
              {apiData !== null && !!apiData.photos.length ? (
                <>
                  <div className={styles["layout-content-cards-container"]}>
                    {apiData.photos?.map((_data, index) => (
                      <Card
                        key={`index_${index}`}
                        imageSrc={_data?.urls?.regular}
                        cardDesc={
                          _data?.description || "No description available"
                        }
                        type={2}
                      />
                    ))}
                  </div>
                  <div className={styles["pagination-wrapper"]}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={apiData.totalPages}
                      pageChangeHandler={(value) => setCurrentPage(value)}
                    />
                  </div>
                </>
              ) : (
                <div>No search results found</div>
              )}
            </>
          )}
        </LoaderWrapper>
      </div>
    </div>
  );
};

export default Search;
