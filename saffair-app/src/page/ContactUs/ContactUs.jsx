import React, { useState } from "react";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../../redux/user/userSlice";
import emailjs from '@emailjs/browser';



const ContactUs = () => {
  const [msg, setmsg] = useState("");
  const [formData, setFormData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [uname,setName] = useState('');
  const [uemail,setEmail] = useState('');
  const [umessage,setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceID = 'service_y83p4py';
    const templateID = 'template_fuis09h';
    const publicKey = 'GuGLkhlrvX2f8Kzoq';

    const templateParams = {
      from_name: uname,
      email: uemail,
      to_name:'Team Saffair',
      message: umessage,
    };
    emailjs.send(serviceID,templateID,templateParams,publicKey)
    .then((response) => {
      console.log('Email sent successfully', response);
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.error('error sending email:',error);
    });
  };



  return (
    <div
      className="flex flex-col mt-20 sm:mx-20 bg-gray-100 border-2 border-gray-400 mb-10"
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
        <div className="logoContainer mt-5 flex justify-center items-center mx-auto">
          <img
            className="saffairlogo"
            src="./assets/logofooter.png"
            alt="logo"
            height="50px"
          />
        </div>
      </div>
      <br />
      <div className="justify-center">
        <h2 className="text-center font-bold sm:text-3xl mb-4">CONTACT US</h2>
        <p></p>
        <br />
        <br />
        <div className="justify-center flex">
          <p className="sm:text-2xl  ">
            If you have any questions, suggestions, or feedback, please feel free
            to reach out to us using the form below.
          </p>
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
                Message
              </label>
              <br />
              <Textarea
                rows="4"
                cols="40"
                id="msg"
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
            Thank you for reaching out to us. We will get back to you as soon as possible.
          </p>
        )}
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ContactUs;
