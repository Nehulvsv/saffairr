import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [quizData, setQuizData] = useState({
    question: "",
    options: ["", "", ""],
    correctAnswer: "",
  });

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:6600/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        // navigate(`/post/${data.slug}`);
        navigate(`/blog`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...quizData.options];
    updatedOptions[index] = value;
    setQuizData({
      ...quizData,
      options: updatedOptions,
    });
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      quizQuestion: quizData.question,
      quizOptions: quizData.options,
      correctAnswer: quizData.correctAnswer,
    });
  };

  return (
    <div className="p-3 max-w-3xl mx-auto mt-8 min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create A Readings
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {currentUser.isAdmin && (
          <Select
            onChange={(e) =>
              setFormData({ ...formData, readingType: e.target.value })
            }
          >
            <option value="Blog">Blog</option>
            <option value="News">News</option>
            <option value="Update">Update</option>
          </Select>
        )}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="agriculture">Agriculture</option>
            <option value="bollywood">Bollywood</option>
            <option value="business">Business</option>
            <option value="crime">Crime</option>
            <option value="economy">Economy</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="environment">Environment</option>
            <option value="events">Events</option>
            <option value="fashion">Fashion</option>
            <option value="foreign">Foreign</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="hollywood">Hollywood</option>
            <option value="international">International</option>
            <option value="legal">Legal</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="national">National</option>
            <option value="politics">Politics</option>
            <option value="religious">Religious</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="stock market">Stock Market</option>
            <option value="technology">Technology</option>
            <option value="weather">Weather</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="cyanToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        <div>
          <h2>Create Quiz</h2>
          <TextInput
            type="text"
            placeholder="Quiz Question"
            name="question"
            value={quizData.question}
            onChange={handleQuizChange}
            className="mb-2 mt-2"
          />
          {quizData.options.map((option, index) => (
            <TextInput
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mb-2"
            />
          ))}
          <TextInput
            type="text"
            placeholder="Correct Answer"
            name="correctAnswer"
            value={quizData.correctAnswer}
            onChange={handleQuizChange}
            className="mb-2"
          />
          <Button onClick={handleQuizSubmit}>Add Quiz</Button>
        </div>
        <Button type="submit" gradientDuoTone="cyanToBlue">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
