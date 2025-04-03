import { AuthProvider } from "react-admin";
import { BASE_URL } from "../Constant";

function decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}

export const authProvider: AuthProvider = {
    login: async (params: any): Promise<{ redirectTo?: string | boolean } | void> => {
        console.log("Received params in login:", params);
        const { username, password } = params;

        try {
            if (!username || !password) {
                throw new Error("Email and password are required.");
            }
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error data:", errorData); 
                throw new Error(errorData.message || "Invalid email or password!");
            }

            const data = await response.json();
            const detailedData = decodeJWT(data.token);
            
            if (detailedData.userType != "admin"){
                throw new Error("Must be admin to log in! userType : " + detailedData.userType);
            }

            sessionStorage.setItem("accessToken", data.token);
            sessionStorage.setItem("tokenExpiry", detailedData.exp.toString());
            return { redirectTo: "/"};

        } catch (error) {
            console.error("Login failed:", error);
            return Promise.reject(error.message);
        }
    },


    logout: async (): Promise<void> => {
        sessionStorage.removeItem("accessToken");
        return Promise.resolve();
    },

    checkAuth: async () => {
        const token = sessionStorage.getItem("accessToken");
        
        if (!token) {
            console.log("No token found");
            return Promise.reject();
        }

        try {
            // Verify token structure
            const decoded = decodeJWT(token);
            if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
                console.log("Token expired");
                sessionStorage.removeItem("accessToken");
                return Promise.reject();
            }
            return Promise.resolve();
        } catch (error) {
            console.log("Invalid token:", error);
            sessionStorage.removeItem("accessToken");
            return Promise.reject();
        }
    },


    checkError: async (error: any) => {
        if (error?.status === 401 || error?.status === 403) {
            console.log("Authentication error, clearing token");
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("tokenExpiry");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: async (): Promise<any> => {
        return Promise.resolve();
    },
};

