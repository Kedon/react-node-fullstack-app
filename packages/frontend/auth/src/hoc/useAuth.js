import { useState, useEffect } from 'react';
import { UserManager, WebStorageStateStore } from 'oidc-client';
// import { IDENTITY_SERVER_CONFIG } from '../config/identityServer';
// REACT_APP_AUTH_URL=https://identity.development.omnyve.com.br
// REACT_APP_IDENTITY_CLIENT_ID=omnify-ui
// REACT_APP_REDIRECT_URL=http://localhost:5002/callback
// REACT_APP_SILENT_REDIRECT_URL=http://localhost:5002/silentRenew
// REACT_APP_LOGOFF_REDIRECT_URL=http://localhost:5002
// REACT_APP_AUDIENCE=API
// REACT_APP_SCOPE=openid profile omnify-api omnyve-chatbot-api omnyve-surveybot-api omnyve-dashboard-api omnyve-corporatechat-api
// REACT_APP_ISSUER=https://identity.development.omnyve.com.br

export const IDENTITY_SERVER_CONFIG = {
    authority: "https://identity.development.omnyve.com.br",
    client_id: "omnify-ui",
    redirect_uri: "http://localhost:5002/callback",
    silent_redirect_uri: "http://localhost:5002/silentRenew",
    post_logout_redirect_uri: "http://localhost:5002",
    audience: "API",
    automaticSilentRenew: true,
    response_type: "id_token token",
    loadUserInfo: true,
    scope: "openid profile omnify-api omnyve-chatbot-api omnyve-surveybot-api omnyve-dashboard-api omnyve-corporatechat-api"
};

const userManager = new UserManager(IDENTITY_SERVER_CONFIG)

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in on mount
        userManager.getUser().then(loggedInUser => {
            if (loggedInUser) {
                console.log(loggedInUser);
                setUser(loggedInUser);
            }
        });

        // Handle user session events
        const onUserLoaded = (loadedUser) => {
            setUser(loadedUser)
        };
        const onUserUnloaded = () => {
            console.log('user unloaded')
            setUser(null);
        };
        const onSilentRenewError = () => {
            userManager.removeUser();
            setUser(null);
        };

        // Subscribe to events
        userManager.events.addUserLoaded(onUserLoaded);
        userManager.events.addUserUnloaded(onUserUnloaded);
        userManager.events.addSilentRenewError(onSilentRenewError);

        return () => {
            // Unsubscribe from events on cleanup
            userManager.events.removeUserLoaded(onUserLoaded);
            userManager.events.removeUserUnloaded(onUserUnloaded);
            userManager.events.removeSilentRenewError(onSilentRenewError);
        };
    }, []);

    useEffect(() => {
        if (user && user.expired) {
            // Logout if user is expired
            userManager.signoutRedirect();
        }
    }, [user]);

    const signinRedirectCallback = () => {
        /*api.userLogon()
          .then(res => {
            alert(JSON.stringify(res))
          })
          .catch(err => { alert(JSON.stringify(err)) })*/
        // return userManager.signinRedirectCallback()
        return userManager.signinRedirectCallback()
      }

    const login = () => userManager.signinRedirect();
    const logout = () => userManager.signoutRedirect();

    return { user, login, logout, signinRedirectCallback };
};

export default useAuth;
