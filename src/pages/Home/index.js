import React from "react";

import CategoryCard from "components/CategoryCard";
import ItemCard from "components/ItemCard";
import ItemDetail from "components/ItemDetail";
import TestimonialCard from "components/TestimonialCard";
import Carousel from "components/Carousel";

function Home() {
  return (
    <div>
      <Carousel />
      <CategoryCard
        title="Chicken"
        subTitle="Good source of Protein"
        imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
        handleOnClick={() => console.log("clikced")}
      />
      <ItemCard
        title="Chicken"
        subTitle="Good source of Protein"
        imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
        price="100"
        handleOnButtonClick={() => console.log("clikced")}
        handleOnCardClick={() => console.log("clikced")}
      />
      <ItemDetail
        name="Chicken"
        description="Good source of Protein"
        cost="100"
        imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
        handleOnClick={() => console.log("clikced")}
        counterId={1}
        sendQuantityData={() => console.log("clikced")}
      />
      <TestimonialCard
        name="Hungry Forever"
        description="10 Places In Delhi To Score The Freshest Meat"
        avatar="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/blogs%2Fthumbsup.png?alt=media&token=97e37a01-b3f1-49ad-86c3-c0f8020e8668"
        imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/blogs%2Fhf_blog.png?alt=media&token=6da337f1-ea5e-4ed0-b261-a380c7a583f9"
      />
    </div>
  );
}

export default Home;
