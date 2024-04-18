import React, { useEffect, useState } from "react";
import { getApi, removeDuplicates } from "../../../utils/helper";
import useFormattedData from "./useFormatedData";

const useNewsFeed = () => {
  //States
  const [newsData, setNewsData] = useState<{
    api1Response: any[];
    api2Response: any[];
    api3Response: any[];
  }>({
    api1Response: [],
    api2Response: [],
    api3Response: [],
  });

  const [query, setQuery] = useState("all");
  const [state, setState] = useState({ date: "" });
  const [isLoading, setIsLoading] = useState(false);

  //Hooks
  const { combineNewsData } = useFormattedData(newsData);

  //Functions
  const handleSourceChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setState((prev) => ({ ...prev, source: e.target.value }));
  };

  const handleDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = e.target.value;
    setState((prev) => ({ ...prev, date }));
  };

  const source = removeDuplicates(
    newsData?.api1Response?.map((item) => item?.source?.name)
  );

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.value === "") {
      return setQuery("all");
    }
    setQuery(e.target.value);
  };

  //Effects
  useEffect(() => {
    const controller = new AbortController();
    const getFetchFromNews = async () => {
      setIsLoading(true);
      const data = await getApi(
        `https://newsapi.org/v2/everything?q=${query}&from=${
          state.date
        }&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
        controller.signal
      );
      setIsLoading(false);
      setNewsData((prev) => ({ ...prev, api1Response: data?.articles }));
    };
    const fetchGuardianNews = async () => {
      setIsLoading(true);
      const data = await getApi(
        `https://content.guardianapis.com/search?q=${query}&from-date=${
          state.date
        }&api-key=${import.meta.env.VITE_GURADIAN_API_KEY}`,
        controller.signal
      );
      setIsLoading(false);
      setNewsData((prev) => ({
        ...prev,
        api2Response: data?.response?.results,
      }));
    };
    const fetchNewYorkTimesNews = async () => {
      setIsLoading(true);
      const data = await getApi(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&begin_date=${
          state.date
        }&api-key=${import.meta.env.VITE_NEW_YORK_TIMES_API_KEY}`,
        controller.signal
      );
      setIsLoading(false);
      setNewsData((prev) => ({ ...prev, api3Response: data?.response?.docs }));
    };
    // Calling parallel api call its the same as using promise.all since my apis are not depended
    fetchNewYorkTimesNews();
    fetchGuardianNews();
    getFetchFromNews();

    return () => {
      controller.abort();
    };
  }, [query, state.date]);

  return {
    newsData,
    handleSearchChange,
    query,
    source,
    handleSourceChange,
    combineNewsData,
    isLoading,
    handleDate,
  };
};

export default useNewsFeed;
