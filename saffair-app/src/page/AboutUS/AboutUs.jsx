import React from "react";

const AboutUsPage = () => {
  return (
    <div
      className=" flex flex-col mt-20 sm:mx-20 bg-gray-100 border-2 border-gray-400 mb-10"
      style={{
        borderRadius: "20px",
        fontFamily: "Sans-serif",
        padding: "40px",
        color: "black",
      }}
    >
      <div
        className="patch"
        style={{
          backgroundColor: "#2196BA",
          height: "120px",
          marginBottom: "40px",
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
      </div>
      <br />
      <h2 className="text-center font-bold sm:text-3xl mb-4">ABOUT US</h2>
      <br />
      <h2
        className="sm:text-4xl"
        style={{ fontFamily: "Sans-serif", textAlign: "center" }}
      >
        Welcome To <span id="W_Name1">Saffair</span>
      </h2>
      <br />
      <br />
      <p className="sm:text-2xl ">
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
      <p className="sm:text-2xl">
        I will keep on posting such valuable and knowledgeable information on my
        Website for all of you. Your love and support matters a lot.
      </p>
      <br />
      <br />
      <p
        className="sm:text-3xl"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        Thank you For Visiting Our Site
        <br />
        <br />
        <br />
        <span
          className="sm:text-3xl"
          style={{ color: "#2196ba", fontWeight: "bold", textAlign: "center" }}
        >
          Have A Great Day !
        </span>
      </p>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AboutUsPage;
