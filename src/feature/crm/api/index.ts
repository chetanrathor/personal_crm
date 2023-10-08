import { get, post } from "../../../api";
import { AddHumanResource, AddNewEmail, ApiResponse, CreateNewHumanResourceResponse, GetAllHumanResouces, GetAllHumanResourcesResponse, ListResponse } from "../../types";

export const addHumanResource = (data: AddHumanResource) => post<AddHumanResource, ApiResponse<CreateNewHumanResourceResponse>>('human-resource', data)
export const getAllHumanResources = (params: GetAllHumanResouces) => get<GetAllHumanResouces, ApiResponse<GetAllHumanResourcesResponse>>('human-resource', params)
export const getHumanResource = (id: string) => get(`human-resource/${id}`,)
export const addNewEmail = (data: AddNewEmail) => post('personalized-email', data)


