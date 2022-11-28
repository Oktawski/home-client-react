export interface AuthenticationResponse {
    access: string;
    refresh: string;
}

export interface RefreshTokenResponse {
    access: string;
}

export class RegisterResponse {
    code: number;
    isSuccess: boolean;
    message: string;
    
    constructor(code: number, isSuccess: boolean, message: string) {
        this.code = code;
        this.isSuccess = isSuccess;
        this.message = message;
    }
}