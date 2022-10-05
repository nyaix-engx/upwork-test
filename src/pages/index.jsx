import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { request } from "@helpers/request";
import Card from "@components/Card";
import LoaderWrapper from "@components/LoaderWrapper";
import InputSearch from "@components/InputSearch";
import Pagination from "@components/Pagination";

import styles from "@styles/pages/_index.module.scss";

const Home = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await request({
        url: "photos?page=1",
        method: "GET",
      });
      if (res.status) {
        setPhotos(res.data);
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

  const getContent = () => {
    return photos.map((data, index) => {
      return (
        <Card
          key={`index_${index}`}
          imageSrc={data?.urls?.regular}
          cardDesc={data?.description || "No description found"}
          type={2}
        />
      );
    });
  };

  return (
    <LoaderWrapper
      isError={isError}
      isDataLoaded={isDataLoaded}
      errorMessage={errorMessage}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div>Photos Listing</div>
          <div>
            <InputSearch
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                router.push(`/search?search=${e.target.value}`);
              }}
              onSubmit={() => router.push(`/search?search=${searchValue}`)}
            />
          </div>
        </div>
        {isDataLoaded && (
          <div className={styles["content-wrapper"]}>{getContent()}</div>
        )}
      </div>
    </LoaderWrapper>
  );
};

export default Home;
