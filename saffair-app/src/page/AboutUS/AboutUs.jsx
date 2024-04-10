import React from "react";
import Vision from "../../component/homepageComponent/vision mission/Vision";

const AboutUsPage = () => {
  return (
    <div
      className=" flex flex-col mt-20 "
      style={{
        borderRadius: "20px",
        fontFamily: "Sans-serif",
        paddingTop: "40px",
        paddingLeft: "25px",
        paddingRight: "25px",
        color: "black",
      }}
    >
      
      <br />
      <div className="text-6xl sm:w-1/2 sm:ml-40 sm:font-bold text-customBlue">
        About Us
      </div>
      <br />
      <h2
        className="sm:text-3xl"
        style={{
          fontFamily: "Sans-serif",
          textAlign: "left",
          marginLeft:'160px',
          fontWeight: "bold",
        }}
      >
        Welcome To <span id="W_Name1">Saffair</span>
      </h2>
      <br />
      <br />
      <div className="sm:text-lg  justify-center flex ">
        <div className="w-3/4">
          Saffair is a Professional Environmental Awareness Community Platform.
          Here we will only provide you with interesting content that you will
          enjoy very much. We are committed to providing you the best of
          Environmental Awareness Community, with a focus on reliability and
          Community and Data Given. We strive to turn our passion for
          Environmental Awareness Community into a thriving website. We hope you
          enjoy our Environmental Awareness Community as much as we enjoy giving
          them to you.
          <br />
          <br />I will keep on posting such valuable and knowledgeable
          information on my Website for all of you. Your love and support
          matters a lot.
        </div>
      </div>
      <br />

      <br />
      <br />
      <p
        className="sm:text-lg"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        Thank you For Visiting Our Site
        <br />
        <br />
        <br />
        <span
          className="sm:text-lg"
          style={{
            color: "#2196ba",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Have A Great Day !
        </span>
      </p>
      <br />
      <div style={{ borderBottom: "solid 2px black", width: "100%" }}></div>
      <br />

      <div>
        <Vision />
      </div>
    </div>
  );
};

export default AboutUsPage;
