import React from "react";
import useNewsFeed from "./hook/useNewsFeed";
import { debounce } from "../../utils/helper";

const NewsFeed = () => {
  const { handleSearchChange, combineNewsData, isLoading, handleDate } =
    useNewsFeed();

  return (
    <div>
      <div className="news__div--search">
        <input
          type="search"
          placeholder="search for articles here.."
          name="articleSearch"
          onChange={debounce(handleSearchChange)}
        />
        <div className="display--flex">
          <input type="date" onChange={handleDate} />
        </div>
      </div>

      <section>
        {isLoading ? (
          <div className="news__div--loading">
            <h1>Loading...</h1>
          </div>
        ) : (
          combineNewsData?.map((item) => (
            <div>
              <h3>{item?.title}</h3>
              <p>{item?.content}</p>
            </div>
          ))
        )}
        {combineNewsData?.length === 0 && <h1>No result found</h1>}
      </section>
    </div>
  );
};

export default NewsFeed;
