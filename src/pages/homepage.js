import React, { useState, userEffect, useEffect } from "react";
import Search from "../components/search";
import Picture from "../components/pictures";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  const auth = "563492ad6f9170000100000127ed04650a23400aa3e9fc4e0d64b155";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });

    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
    </div>
  );
};

export default Homepage;
