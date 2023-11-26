import axiosClient from ".";
import { UserInput } from "../model/api";

const users = {
    get: (userInput: UserInput) => {
        const url = `/users?username=${userInput.username}&password=${userInput.password}`
        return axiosClient.get(url)
    },
}

export default users