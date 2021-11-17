import React from "react";

import CategoryCard from "components/CategoryCard";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <CategoryCard
        title="Chicken"
        subTitle="Good source of Protein"
        imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
        handleOnClick={() => console.log("clikced")}
      />
    </div>
  );
}

export default Home;
