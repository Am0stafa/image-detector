import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const styles = {
  container: {
    height: 'calc(100vh - 50px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 300,
  },
  rightInput: {
    padding: '20px',
    marginBottom: '20px',
  },
  rightButton: {
    padding: '10px 20px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    backgroundColor: 'teal',
    cursor: 'pointer',
  },
  friendInput: {
    position: 'absolute',
    padding: '10px',
    fontWeight: 'bold',
    border: 'none',
  },
  friends: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  name: {
    fontWeight: 'bold',
  },
};

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);

  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections.map((d) => Object.values(d.box)));
  };

  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    faces.map((face) => ctx.strokeRect(...face));
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };

    imgRef.current && loadModels();
  }, []);

  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(friends);
  return (
    <div style={styles.container}>
      <div style={{ ...styles.left, width, height }}>
        <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
        <canvas
          onMouseEnter={enter}
          ref={canvasRef}
          width={width}
          height={height}
        />
        {faces.map((face, i) => (
          // under each rectangle add an input
          <input
            name={`input${i}`}
            style={{ left: face[0], top: face[1] + face[3] + 5 }}
            placeholder="Tag a friend"
            key={i}
            className="friendInput"
            onChange={addFriend}
          />
        ))}
      </div>
      <div style={styles.right}>
        <h1>Share your post</h1>
        <input
          type="text"
          placeholder="What's on your mind?"
          style={styles.rightInput}
        />
        {friends && (
          <span style={styles.friends}>
            with <span style={styles.name}>{Object.values(friends) + " "}</span>
          </span>
        )}
        <button style={styles.rightButton}>Send</button>
      </div>
    </div>
  );
};

export default NewPost;

