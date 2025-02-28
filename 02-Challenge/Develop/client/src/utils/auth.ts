import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const decodedToken = jwtDecode(this.getToken());
    return decodedToken;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decodedToken = jwtDecode(token) as JwtPayload;
    if (decodedToken.exp) {
      return console.log ('Token is expired');
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
    return
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.assign('/');
    return
  }
}

export default new AuthService();
