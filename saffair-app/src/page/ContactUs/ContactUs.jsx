import React, { useState } from "react";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [msg, setmsg] = useState("");
  const [formData, setFormData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [uname, setName] = useState("");
  const [uemail, setEmail] = useState("");
  const [umessage, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceID = "service_y83p4py";
    const templateID = "template_fuis09h";
    const publicKey = "GuGLkhlrvX2f8Kzoq";

    const templateParams = {
      from_name: uname,
      email: uemail,
      to_name: "Team Saffair",
      message: umessage,
    };
    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("error sending email:", error);
      });
  };

  return (
    <div className=" sm:mx-40 mt-20 ">
      <div className="sm:text-6xl sm:w-1/2 font-bold text-customBlue">
        Do you have any questions?
      </div>
      <div className="mt-4 sm:w-1/2 sm:mb-20">
        For inquiries, contact us via phone, email or our website's contact form
        given below. Our Saffair team is here to help you effectively.
      </div>
      <div className="sm:flex">
        <div className="sm:w-1/4 ">
          <div className=" w-full flex-flex-rows justify-center">
            <p className="sm:text-lg font-bold justify-center flex">
              Contact Us
            </p>
            <p className="text-center">
              We are here to help you , whatever kind of help you need
            </p>
            <p className="text-customBlue font-bold mt-2">inquiry@saffair.in</p>
          </div>
          <div className="w-full flex-flex-rows justify-center">
            <div
              className="hori w-full mt-2 mb-2 bg-black"
              style={{ height: "1px" }}
            ></div>
            <p className="sm:text-md font-bold justify-center flex">ADDRESS</p>
            <p className="text-center">
              We are here to help you , whatever kind of help you need
            </p>
            <p className="text-customBlue font-bold mt-2">inquiry@saffair.in</p>
          </div>
          <div class="h-full border- border-gray-500"></div>
        </div>

        <div className=" w-3/4">
          <div className="flex justify-center ">
            <form
              className="sm:text-2xl mx-2 sm:w-3/4 flex-col  "
              onSubmit={handleSubmit}
            >
              <div>
                <label className="text-xl">
                  Your Name<span className="text-red-500 ml-1">*</span>
                </label>
                <TextInput
                  type="text"
                  id="name"
                  value={uname}
                  placeholder="name"
                  maxLength={200}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xl">
                  Your Email<span className="text-red-500 ml-1">*</span>
                </label>
                <TextInput
                  type="email"
                  id="email"
                  value={uemail}
                  placeholder="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xl">
                  Message<span className="text-red-500 ml-1">*</span>
                </label>
                <br />
                <Textarea
                  rows="4"
                  cols="40"
                  id="msg"
                  required
                  value={umessage}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <br />
              <Button
                gradientDuoTone="cyanToBlue"
                outline
                type="submit"
                disabled={loading}
                className="mb-5"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-1">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="justify-center">
        <div className="text-center font-bold sm:text-3xl mb-4">CONTACT US</div>
        <div className="text-left flex">
          <p className="sm:text-2xl">Do you have any questions?</p>
        </div>

        <br />
        <div className="flex justify-center w-full ">
          <form
            className="sm:text-2xl  sm:w-1/2 flex-col  "
            onSubmit={handleSubmit}
          >
            <div>
              <label>
                Name<span className="text-red-500 ml-1">*</span>
              </label>
              <TextInput
                type="text"
                id="name"
                value={uname}
                placeholder="name"
                maxLength={200}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>
                Email<span className="text-red-500 ml-1">*</span>
              </label>
              <TextInput
                type="email"
                id="email"
                value={uemail}
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>
                Message<span className="text-red-500 ml-1">*</span>
              </label>
              <br />
              <Textarea
                rows="4"
                cols="40"
                id="msg"
                required
                value={umessage}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <br />
            <Button
              gradientDuoTone="cyanToBlue"
              outline
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-1">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
        <br />
        <br />
        {showSuccessMessage && (
          <p
            className="sm:text-3xl contactusmsg"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Thank you for reaching out to us. We will get back to you as soon as
            possible.
          </p>
        )}
        <br />
        <br />
        <br />
      </div> */}
    </div>
  );
};

export default ContactUs;
