import { useEffect, useState, useContext } from "react";
// import NewsCon from "./../news/NewsCon";
import UpdatesCon from "./UpdatesCon";
import "./../blog/blog.css";
import { SearchpostContext } from "../Home";
import { Breadcrumb, Spinner} from "flowbite-react";
import { HiHome } from "react-icons/hi";

import { Navbar,Button } from "flowbite-react";
import { Link } from "react-router-dom";

import "./../../component/homepageComponent/weatherupdates/weatherupdate.css";

export default function Updates() {
  const { search } = useContext(SearchpostContext);
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch posts from the server
    setLoading(true);
    fetch("http://localhost:6600/post")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((fetchedPosts) => {
        const newsPosts = fetchedPosts.filter(
          (post) => post.readingType === "Update"
        );
        setPosts(newsPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    // Filter posts based on search keyword
    if (search.trim() !== "") {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredPosts);
    } else {
      setSearchResults([]);
    }
  }, [search, posts]);

  return (
    <>
      <div className="blog-container">
        {loading ? (
          <div className="spinnerr" style={{ height: "90vh" }}>
            <Spinner size="xl" />
          </div>
        ) : (
          <>
          <Navbar fluid rounded className="flex justify-center ">
      <Navbar.Collapse  >
        <Link to="/blog">
        <Navbar.Link className="text-xl  " >
          Blogs
        </Navbar.Link>
        </Link>
        <Link to="/news">
        <Navbar.Link className="text-xl  ">News</Navbar.Link></Link>
        <Link to="/Update">
        <Navbar.Link className="text-xl border-b-2 border-customBlue " active>Updates</Navbar.Link></Link>
        
      </Navbar.Collapse>
    </Navbar>
     
    <Breadcrumb style={{ fontFamily: "myFont" }}>
              <Link to={"/"} className="link">
                {" "}
                <Breadcrumb.Item icon={HiHome} className="p-2">
                  Home
                </Breadcrumb.Item>{" "}
              </Link>
              <p className="text-gray-500">&gt;</p>
              <Link to={"/readings"} className="link">
                <Breadcrumb.Item className="p-2">Readings</Breadcrumb.Item>
              </Link>
              <p className="text-gray-500">&gt;</p>
              <Link to={"/Update"} className="link">
                <Breadcrumb.Item className="p-2">Updates</Breadcrumb.Item>
              </Link>
            </Breadcrumb>
            <div className="blogtitle">
              <h2 className="text-2xl font-bold">Updates</h2>
              <hr />
            </div>

            <div className="grid">
              <>
                {posts.map((post) => (
                  <UpdatesCon key={post._id} {...post} color="black" />
                ))}
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
}
