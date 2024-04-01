import React, { useState, useRef } from "react";
import { Button, TextInput, Textarea, Modal } from "flowbite-react";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { uploadBytesResumable, getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({}); // Define formData state variable

  const { currentUser, error, loading } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [openModal, setOpenModal] = useState(false);
  const [imagePreviewField, setImagePreviewField] = useState(null); // State for image preview in fields
  const [imagePreviewModal, setImagePreviewModal] = useState(null); // State for image preview in modal

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewField(reader.result); // Set image preview for fields
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageChangeModal = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewModal(reader.result); // Set image preview for modal
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, including the image file
  };

  return (
    <div className="mx-auto p-3 w-full">
      <h1 className="mt-1 mb-3 text-left font-semibold text-3xl">
        Create Events
      </h1>
      <form onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-3 gap-4 w-full">
          <div>
            <label>
              Event Name<span className="text-red-500 ml-1">*</span>
            </label>
            <TextInput
              type="text"
              placeholder="Event Name"
              id="eventName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              Start Date<span className="text-red-500 ml-1">*</span>
            </label>
            <TextInput
              type="date"
              id="startDate"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              End Date<span className="text-red-500 ml-1">*</span>
            </label>
            <TextInput
              type="date"
              id="endDate"
              onChange={handleChange}
              required
            />
          </div>
          <div className="bio mb-3">
            <div>
              <label>
                Description<span className="text-red-500 ml-1">*</span>
              </label>
              <br />
              <Textarea
                rows="4"
                id="bio"
                value={bio}
                className="w-full"
                maxLength={200}
                onChange={(e) => setBio(e.target.value)}
                required
              />
              <p className="text-gray-500 text-xs">
                {200 - bio.length} characters remaining
              </p>
            </div>
          </div>
        </div>
        <div>
          <label>
            Upload Image<span className="text-red-500 ml-1">*</span>
          </label>
          <TextInput
            type="file"
            accept="image/*"
            ref={filePickerRef}
            onChange={handleImageChange}
            required
            className="grid grid-cols-3 mb-4"
          />
          {imagePreviewField && (
            <div>
              <img
                src={imagePreviewField}
                alt="Image Preview"
                className="mt-5 mb-5 border-black-200 border-2"
                style={{ width: "550px", height: "auto" }}
              />
            </div>
          )}
        </div>
        <Button type="submit" gradientDuoTone="cyanToBlue" outline>
          Create The Event
        </Button>
      </form>
      <hr className="hr-line border-1 border-black mt-8 opacity-30 mb-3"></hr>
      <h1 className="mt-5 mb-5 text-left font-semibold text-3xl">
        Registered Events
      </h1>
      <form>
        <div className="overflow-x-auto mb-3 border border-black-200 border-1">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Event name</Table.HeadCell>

              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>End Date</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Environment day Event
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  20-03-24
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  20-03-24
                </Table.Cell>
                <Table.Cell className="whitespace-  nowrap font-medium text-gray-900 dark:text-white">
                  To celebrate the Environment day by being serious about the
                  environment
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link  onClick={() => setOpenModal(true)}><div className=" text-blue-500 ">Edit</div></Link>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link  onClick={() => setOpenModal(true)}><div className=" text-red-500 ">Delete</div></Link>
                </Table.Cell>
              </Table.Row>
              
             
            </Table.Body>
          </Table>

        </div>
      </form>
      <Modal show={openModal} popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4 w-full">
          <div>
            <label>
              Event Name<span className="text-red-500 ml-1">*</span>
            </label>
            <TextInput
              type="text"
              placeholder="Event Name"
              id="eventName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              Start Date<span className="text-red-500 ml-1">*</span>
            </label>
            <TextInput
              type="date"
              id="startDate"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              End Date<span className="text-red-500 ml-1">*</span>
            </label>
            <TextInput
              type="date"
              id="endDate"
              onChange={handleChange}
              required
            />
          </div>
          </div>
          <div className="bio mb-3 w-full">
            <div>
              <label>
                Description<span className="text-red-500 ml-1">*</span>
              </label>
              <br />
              <Textarea
                rows="4"
                id="bio"
                value={bio}
                className="w-full"
                maxLength={200}
                onChange={(e) => setBio(e.target.value)}
                required
              />
              <p className="text-gray-500 text-xs">
                {200 - bio.length} characters remaining
              </p>
            </div>
          </div>
        
          <div>
            <label>
              Upload Image<span className="text-red-500 ml-1">*</span>
            </label>
            <TextInput
              type="file"
              accept="image/*"
              ref={filePickerRef}
              onChange={handleImageChangeModal}
              required
              className="w-full"
            />
            {imagePreviewModal && (
              <div>
                <img
                  src={imagePreviewModal}
                  alt="Image Preview"
                  className="mt-5 mb-5 border-black-200 border-2"
                  style={{ width: "550px", height: "auto" }}
                />
              </div>
            )}
          </div>
          </div>
          <div className="flex justify-center">
            <Button className="mt-4" color="blue" onClick={() => setOpenModal(false)}>
              Update
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}