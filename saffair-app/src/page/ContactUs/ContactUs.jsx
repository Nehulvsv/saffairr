import React from "react";
import {  Button, Spinner, TextInput, Textarea } from "flowbite-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../../redux/user/userSlice";


const ContactUs = () => {
    const {
        currentUser,
        loading,
        error: errorMessage,
      } = useSelector((state) => state.user);
      const [bio, setBio] = useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [showEducationWork, setShowEducationWork] = useState(false);
      const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
      const [updateUserError, setUpdateUserError] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const [formData, setFormData] = useState({});
      const [showForm, setShowForm] = useState(true);
      const [showAlert, setShowAlert] = useState(false);
      const [users, setUsers] = useState([]);
      // const filePickerRef = useRef();
      // const dispatch = useDispatch();
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch(`http://localhost:6600/api/user/getusers`, {
              credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
              setUsers(data.users);
              if (data.users.length < 9) {
                // setShowMore(false);
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchUsers();
        }
      }, [currentUser._id]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(false); // Hide any previous alert messages
        setShowForm(false); // Hide the form
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
          setUpdateUserError("No changes made");
          return;
        }
        try {
          dispatch(updateStart());
          const res = await fetch(
            `http://localhost:6600/api/user/update/${currentUser._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(formData),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            dispatch(updateFailure(data.message));
            setUpdateUserError(data.message);
            setShowAlert(true);
          } else {
            dispatch(updateSuccess(data));
            setShowAlert(true);
            setUpdateUserSuccess(
              "YOU HAVE SUCCESSFULLY SUBMITTED YOUR RESPONSE ! "
            );
          }
        } catch (error) {
          dispatch(updateFailure(error.message));
          setUpdateUserError(error.message);
          setShowAlert(true);
        }
      };
      const toggleIsReq = async (userId) => {
        try {
          // Make a PUT request to the backend API endpoint
          const res = await fetch(
            `http://localhost:6600/api/user/toggleReq/${userId}`,
            {
              method: "PUT",
              credentials: "include", // If needed
            }
          );
          const data = await res.json();
          if (res.ok) {
            // Update the user list with updated isAdmin status
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === userId ? { ...user, isReq: !user.isReq } : user
              )
            );
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
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
            <br />
            
            <br />
            <p className="sm:text-2xl ">
                If you have any questions, suggestions, or feedback, please feel free
                to reach out to us using the form below or via email.
            </p>
            <br />
            <div>
            <form className="sm:text-2xl flex-col gap-4 mx-4">
                <div>
                    <label>
                        Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <TextInput
                        type="text"
                        id="username"
                        placeholder="username"
                        maxLength={200}
                        defaultValue={currentUser.username}
                        onChange={handleChange}
                    />
                </div>
                <div>

                    <label>
                        Email<span className="text-red-500 ml-1">*</span>
                    </label>
                    <TextInput
                        type="email"
                        id="email"
                        placeholder="email"
                        defaultValue={currentUser.email}
                        onChange={handleChange}
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
                        id="bio"
                        value={bio}
                        // onChange={handleChange}
                        onChange={(e) => setBio(e.target.value)}
                        required
                    />
                    <p className="text-gray-500 text-xs">
                        {200 - bio.length} characters remaining
                    </p>
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
            <p className="sm:text-3xl" style={{ fontWeight: "bold", textAlign: "center" }}>
                Thank you for reaching out to us. We will get back to you as soon as possible.
            </p>
            <br />
            <br />
            <br />
        </div>
        </div>

    );
};

export default ContactUs;
