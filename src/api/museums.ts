import axiosClient from ".";
import { MuseumInput } from "../model/api";

export type Museum = {
  id: string;
  name: string;
  publicKey: string;
  image: string;
  createAt: Date;
};

export type GetMuseumResponse = {
  data: Museum[];
};


const museums = {
  get: (museumInput: MuseumInput) => {
    const url = `/museums?publicKey=${museumInput.publicKey}`;
    console.log(url);
    return axiosClient.get<GetMuseumResponse>(url);
  },
  getById: (id: string) => {
    const url = `/museums?id=${id}`
    return axiosClient.get<GetMuseumResponse>(url)
  },
  getAll: () => {
    const url = '/museums'
    return axiosClient.get<GetMuseumResponse>(url)
  },
  put: (publicKey: string, data: any) => {
      const url= `/museums?publicKey=${publicKey}`
      return axiosClient.put(url, data)
  }
}

export default museums;
