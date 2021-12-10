import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  getCategoryAction,
  spinnerAction,
  getTestimonialAction,
} from "redux/actions";

import Carousel from "components/Carousel";
import Category from "pages/home/category";
import TestimonialList from "pages/home/testimonialList";
import QualityCheck from "pages/home/qualityCheck";

const Home = ({ getCategoryAction, spinnerAction, getTestimonialAction }) => {
  useEffect(() => {
    spinnerAction(true);
    getCategoryAction(() => spinnerAction(false));
    getTestimonialAction(() => spinnerAction(false));
  }, [getCategoryAction, spinnerAction, getTestimonialAction]);

  return (
    <div>
      <Carousel />
      <QualityCheck />
      <Category />
      <TestimonialList />
    </div>
  );
};

const mapDispatchToProps = {
  getCategoryAction,
  spinnerAction,
  getTestimonialAction,
};

export default connect(null, mapDispatchToProps)(Home);

// <CategoryCard
//         title="Chicken"
//         subTitle="Good source of Protein"
//         imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
//         handleOnClick={() => console.log("clikced")}
//       />
//       <ItemCard
//         title="Chicken"
//         subTitle="Good source of Protein"
//         imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
//         price="100"
//         handleOnButtonClick={() => console.log("clikced")}
//         handleOnCardClick={() => console.log("clikced")}
//       />
//       <ItemDetail
//         name="Chicken"
//         description="Good source of Protein"
//         cost="100"
//         imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
//         handleOnClick={() => console.log("clikced")}
//         counterId={1}
//         sendQuantityData={() => console.log("clikced")}
//       />
//       <TestimonialCard
//         name="Hungry Forever"
//         description="10 Places To Score The Freshest Meat"
//         avatar="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/blogs%2Fthumbsup.png?alt=media&token=97e37a01-b3f1-49ad-86c3-c0f8020e8668"
//         imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/blogs%2Fhf_blog.png?alt=media&token=6da337f1-ea5e-4ed0-b261-a380c7a583f9"
//       />
//       <AddressCard
//         name="Abhay Sharma"
//         address="710 Jefferson Street"
//         landmark="St Ann Chruch"
//         handleOnClick={() => console.log("clicked")}
//         state="NJ"
//         city="Hoboken"
//       />
//       <CheckoutCard
//         title="Chicken"
//         description="Good source of Protein"
//         cost="100"
//         imgSrc="https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/new_image%2F1601029462317.jpeg?alt=media&token=9e9f45fc-7c77-4db7-b0aa-9421cdb789ba"
//         onClickRemove={() => console.log("clikced")}
//         counterId={1}
//         quantity={2}
//         sendQuantityData={() => console.log("clikced")}
//       />

//       <OrderCard
//         id="1"
//         items={[{ itemName: "Chicken", itemQuantity: 3 }]}
//         status="Pending"
//         price="1000"
//         paymentType="COD"
//         orderDate="12/12/2022"
//       />
//       <Spinner scale={0.4} color="#ea1a20" />
