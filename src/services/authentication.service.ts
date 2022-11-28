import { AuthenticationRequest, RefreshTokenRequest, RegisterRequest } from "../requests/authentication.requests";
import { AuthenticationResponse, RefreshTokenResponse, RegisterResponse } from "../responses/authentication.responses";

export const authenticationService = {
    authenticate,
    register
};

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

    const response = await fetch(url, options);
    const body: any = response.json();
    const authenticationResponse = body as AuthenticationResponse;
    const isSuccess = response.ok;

    console.log(url);
    

    if (isSuccess) {
        const accessToken: string = authenticationResponse.access;
        console.log(accessToken);
        // set access token to observable

        const refreshToken: string = authenticationResponse.refresh;
        localStorage.setItem("refreshToken", refreshToken);
    }

    return isSuccess;
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

    const response = await fetch(url, options);
    const body: any = response.json();
    const refreshTokenResponse = body as RefreshTokenResponse;
    const isSuccess = response.ok;

    console.log(refreshTokenResponse.access);

    return isSuccess; 

    
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

    const url = "http://127.0.0.1:8000/auth/register";

    const response = await fetch(url, options);
    const body: any = response.json();

    return new RegisterResponse(response.status, response.ok, body["message"]);
}
