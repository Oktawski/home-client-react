import { BehaviorSubject } from "rxjs";
import { AuthenticationRequest, RefreshTokenRequest, RegisterRequest } from "../requests/authentication.requests";
import { AuthenticationResponse, RefreshTokenResponse, RegisterResponse } from "../responses/authentication.responses";

const accessTokenSubject = new BehaviorSubject(getAuthToken());
const isLoggedInSubject = new BehaviorSubject(accessTokenSubject.value !== null);

export const authenticationService = {
    authenticate,
    register,
    getAuthToken,
    logout,
    getAuthHeader(): string { return `Bearer ${getAuthToken()}`; },
    get isLoggedIn(): boolean { return isLoggedInSubject.value; },
    isLoggedInObservable: isLoggedInSubject.asObservable()
};

function logout() {
    console.log(getAuthToken());
    localStorage.removeItem("accessToken");
    console.log(getAuthToken());
    
    accessTokenSubject.next(null);
    isLoggedInSubject.next(false);
}

function getAuthToken(): string | null {
    return localStorage.getItem("accessToken");
}

function setAuthToken(token: string) {
    localStorage.setItem("accessToken", token);
}


async function authenticate(request: AuthenticationRequest): Promise<boolean> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(request)
    };

    const url = "http://127.0.0.1:8000/auth/token/";

    return await fetch(url, options)
        .then(async response => {
            const body: any = await response.json();
            const authenticationResponse = body as AuthenticationResponse;

            console.log(authenticationResponse);

            if (response.ok) {
                setAuthToken(authenticationResponse.access);
                accessTokenSubject.next(getAuthToken());
                isLoggedInSubject.next(true);
                // TODO: set refresh token

            }

            return response.ok;
        })
        .catch(error => {
            return false;
        });
}

async function refreshToken(request: RefreshTokenRequest): Promise<boolean> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(request)
    };

    const url = "http://127.0.0.1:8000/auth/refresh";

    return await fetch(url, options)
        .then(async response => {
            const body: any = await response.json();
            const refreshTokenResponse = body as RefreshTokenResponse;
            
            setAuthToken(refreshTokenResponse.access);
            console.log(refreshTokenResponse.access);
            
            return response.ok;
        })
        .catch(error => {
            return false;
        });
}

async function register(request: RegisterRequest): Promise<RegisterResponse> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(request)
    };

    const url = "http://127.0.0.1:8000/auth/register/";

    return await fetch(url, options)
        .then(async response => {
            const body: any = await response.json();
            
            console.log(response.status);
            console.log(response.ok);
            console.log(body);
            
            return new RegisterResponse(response.status, response.ok, body["message"]);
        })
        .catch(error => {
            return new RegisterResponse(400, false, "There was an error");
        });
}
