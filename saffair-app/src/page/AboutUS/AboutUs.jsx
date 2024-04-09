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
      {/* <div
        className="patch"
        style={{
          // backgroundColor: "#2196BA",
          height: "120px",
          marginBottom: "40px",
          // padding: "20px",
          borderRadius: "10px",
        }}
      >
         <div class="logoContainer mt-5 flex justify-center items-center mx-auto">
          <img
            class="saffairlogo"
            src="./assets/logofooter.png"
            alt="logo"
            height="50px"
          />
        </div> 
      </div> */}
      <br />
      <h2 className="text-center font-bold sm:text-xl mb-4">ABOUT US</h2>
      <br />
      <h2
        className="sm:text-xl"
        style={{ fontFamily: "Sans-serif", textAlign: "center" }}
      >
        Welcome To <span id="W_Name1">Saffair</span>
      </h2>
      <br />
      <br />
      <p className="sm:text-lg flex-column justify-center ">
        <span id="W_Name2">Saffair</span> is a Professional{" "}
        <span id="W_Type1">Environmental Awareness Community</span> Platform.
        Here we will only provide you with interesting content that you will
        enjoy very much. We are committed to providing you the best of{" "}
        <span id="W_Type2">Environmental Awareness Community</span>, with a
        focus on reliability and{" "}
        <span id="W_Spec">Community and Data Given</span>. we strive to turn our
        passion for <span id="W_Type3">Environmental Awareness Community</span>{" "}
        into a thriving website. We hope you enjoy our{" "}
        <span id="W_Type4">Environmental Awareness Community</span> as much as
        we enjoy giving them to you.
      </p>
      <br />
      <p className="sm:text-lg">
        I will keep on posting such valuable and knowledgeable information on my
        Website for all of you. Your love and support matters a lot.
      </p>
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
            borderBottom: "solid 2px black",
          }}
        >
          Have A Great Day !
        </span>
      </p>
      <br />
      <br />
      <br />
      <div>
        <Vision />
      </div>
    </div>
  );
};

export default AboutUsPage;
