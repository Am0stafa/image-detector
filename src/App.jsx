import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";

const styles = {
  app: {
    display: 'flex',
  },
  newPostCard: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPost: {
    display: 'flex',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  postForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  postInput: {
    height: '30px',
    border: 'none',
    marginBottom: '10px',
  },
  button: {
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    color: 'white',
    backgroundColor: 'teal',
    cursor: 'pointer',
  },
};

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    // function that creates a fake URL for the image
    const getImage = () => {
      // create image object
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };

    file && getImage();
  }, [file]);

  return (
    <div style={styles.app}>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div style={styles.newPostCard}>
          <div style={styles.addPost}>
            <img
              src="https://images.pexels.com/photos/9371782/pexels-photo-9371782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              style={styles.avatar}
            />
            <div style={styles.postForm}>
              <input
                type="text"
                placeholder="What's on your mind?"
                style={styles.postInput}
              />
              <label htmlFor="file" style={styles.addPost}>
                {/* Images */}
                <button style={styles.button}>Send</button>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
