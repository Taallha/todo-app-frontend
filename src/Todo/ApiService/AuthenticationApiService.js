import { apiClient } from "./ApiClient"

export const retrieveToken =  (username,password) =>  apiClient.post("/authenticate",{username,password})