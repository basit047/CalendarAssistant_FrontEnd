export const generateGoogleAuthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    client_id: "814206436687-df03frm3q9ml8ue57cnliu2q3m90e3ov.apps.googleusercontent.com",
    redirect_uri: "https://calendarassistant-backend.onrender.com/Calendar/AuthenticateUser", // your .NET backend
    response_type: "code",
    access_type: "offline", // get refresh token
    prompt: "consent",      // always ask again to get refresh token
    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/calendar.readonly"
    ].join(" "),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs}`;
};