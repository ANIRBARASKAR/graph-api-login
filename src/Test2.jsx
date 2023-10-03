import React, { useState, useEffect } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from "axios";

export default function Test2() {
  const [photos, setPhotos] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [userID, setuserID] = useState(null);

  const appId = "1250037985682717"; //anir123
  useEffect(() => {
    // Replace with your Facebook App ID

    // Function to fetch user photos
    const fetchPhotos = async (accessToken) => {
      console.log("🌟🌟", accessToken, userID);

      if (accessToken && userID) {
        try {
          // Fetch user timeline photos
          const timelinePhotosResponse = await axios.get(
            ` https://graph.facebook.com/v17.0/me?fields=birthday%2Cemail%2Cgender%2Cfirst_name%2Clanguages%2Clocation%2Cshort_name%2Cphotos%2Cpicture%7Burl%2Ccache_key%2Cheight%2Cis_silhouette%2Cwidth%7D%2Cposts%7Bfull_picture%7D&access_token=${accessToken} `
          );
          console.log("timelinePhotosResponse", timelinePhotosResponse);
          setPhotos(timelinePhotosResponse.data.posts.data);
          if (timelinePhotosResponse.status === 200) {
            const timelineData = timelinePhotosResponse.data.data;
            // setTimelinePhotos(timelineData);
            console.log(
              "timelineData 🌟🌟🌟🌟🌟",
              timelineData,
              "timelinePhotosResponse",
              timelinePhotosResponse
            );
          } else {
            console.error("Failed to fetch timeline photos from Facebook");
          }
        } catch (error) {
          console.error("Error fetching photos:😜", error);
        }
      }
    };

    // Fetch photos when the component mounts
    fetchPhotos(accessToken);
    // console.log("accessToken", accessToken);
  }, [accessToken, userID]);

//   const handleLogin = (response) => {
//     console.log("Logged in with Facebook: 🤘🤘", response);
//     setAccessToken(response.data.accessToken);
//     setuserID(response.data.userID);
//   };
const handleLogin = (response) => {
    console.log("Logged in with Facebook: 🤘🤘", response);
    setAccessToken(response.accessToken);
    setuserID(response.userID);
  };

  const handleLogout = () => {
    // Handle logout if needed
    handleLogin();
  };

  useEffect(() => {
    console.log("userID 🎊🎊", userID);
  }, [userID]);
  useEffect(() => {
    console.log("photos 🎊🎊", photos);
  }, [photos]);

  return (
    <div>
      <h1>Facebook Photos</h1>
      {accessToken ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Your Photos:</h2>
          <ul>
            {photos.map((photo) => (
              <li key={photo.id}>
                <img
                  src={photo.full_picture}
                  alt={photo?.name}
                  width={100}
                  height={100}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <LoginSocialFacebook
          appId={appId}
          onResolve={handleLogin}
          onReject={(error) => console.log("error", error)}
        >
          <button>Log in with Facebook</button>
        </LoginSocialFacebook>
      )}
    </div>
  );
}
