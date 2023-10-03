import React, { useEffect , useState } from "react";

const Test = () => {


    const [accessToken, setaccessToken] = useState()
  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 3515513842094278,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v11.0"
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("User is logged in", response);
          // You can now make API calls using response.authResponse.accessToken
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    );
  };

  return (
    <div>
      <h1>Facebook Login Example</h1>
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  );
};

export default Test;
