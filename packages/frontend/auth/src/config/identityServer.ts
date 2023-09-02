export const IDENTITY_SERVER_CONFIG = {
    authority: process.env.REACT_APP_AUTH_URL,
    client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URI,
    post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL,
    audience: process.env.REACT_APP_AUDIENCE,
    automaticSilentRenew: true,
    response_type: "id_token token",
    loadUserInfo: false,
    scope: process.env.REACT_APP_SCOPE
};
