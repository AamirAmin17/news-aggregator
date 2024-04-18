const useFormattedData = (newsData: {
  api1Response: any[];
  api2Response: any[];
  api3Response: any[];
}) => {
  const getFormatedDataFromNewsApi = newsData.api1Response?.map((item) => ({
    title: item.title,
    source: item.source.name,
    content: item.content,
  }));
  const getFormatedDataFromGuradianApi = newsData.api2Response?.map((item) => ({
    title: item.webTitle,
    content: item.webUrl,
    source: "",
  }));
  const getFormatedDataFromNewYorkTimesApi = newsData.api3Response?.map(
    (item) => ({
      title: item.abstract,
      content: item.lead_paragraph,
      source: item.source,
    })
  );

  const combineNewsData = [
    ...(getFormatedDataFromNewsApi ?? []),
    ...(getFormatedDataFromGuradianApi ?? []),
    ...(getFormatedDataFromNewYorkTimesApi ?? []),
  ];

  return { combineNewsData };
};

export default useFormattedData;
