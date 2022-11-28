export class AuthenticationRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class RefreshTokenRequest {
    refresh: string;

    constructor(refresh: string) {
        this.refresh = refresh;
    }
}

export class RegisterRequest {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;

     constructor(username: string, email: string, password: string, passwordConfirm: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirm = passwordConfirm;

     }
}