import { Drawable } from "../../drawable/drawable";
/**----------------------------------------------------------------------------
 * @class   GoogleView
 * ----------------------------------------------------------------------------
 * Create a reusable login button for signing in with google accounts
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class GoogleLoginButton extends Drawable {
    private _clientId;
    private _domain;
    /** track the loaded Google profile */
    private _googleProfile;
    /** functions that want to know about login events */
    protected _loginListeners: Function[];
    /** functions that want to know about logout events */
    protected _logoutListeners: Function[];
    /** track whether we are currently logged in */
    protected _isLoggedIn: boolean;
    get isLoggedIn(): boolean;
    set isLoggedIn(data: boolean);
    /**
     * create a Google login button
     */
    constructor(clientId: string, domain?: string);
    protected _shouldSkipCreateElements(): boolean;
    /**
     * create the elements needed to display the login button
     */
    protected _createElements(): void;
    /**
     * _onSignIn
     * ----------------------------------------------------------------------------
     * Handle when we've attempted to log in through google's api
     * @param googleUser
     */
    private _onSignIn;
    /**
     * _onSignedIn
     * ----------------------------------------------------------------------------
     * Handle when a user is actually logged in through the google API
     */
    private _onSignedIn;
    /**
     * _onSignInFailure
     * ----------------------------------------------------------------------------
     * Handle when signing in fails
     */
    private _onSignInFailure;
    /**
     * signOut
     * ----------------------------------------------------------------------------
     * Allow a user to specify that they are logging out
     */
    signOut(): void;
    /**
     * addLoginListener
     * ----------------------------------------------------------------------------
     * Adds a listener for the log in event
     * @param   listener    What to do on log in
     */
    addLoginListener(listener: Function): void;
    /**
     * addLogoutListener
     * ----------------------------------------------------------------------------
     * Add a listener for the log out event
     * @param   listener    What to do on logout
     */
    addLogoutListener(listener: Function): void;
    protected abstract _login(token: string, onSuccess?: Function, onFailure?: Function): void;
    protected abstract _logout(onSuccess?: Function, onFailure?: Function): void;
}
