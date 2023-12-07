import { Column, Row, UserInfo } from "../types/types";
import { GenerateUUid } from "./common";

export const userInfoDummy: UserInfo[] = [
    {id: GenerateUUid(), username: 'test01', email: 'test01@gmail.com', phoneNumber: '0988777666', address: 'Vinh Long'},
    {id: GenerateUUid(), username: 'test02', email: 'test02@gmail.com', phoneNumber: '0899665556', address: 'An Giang'},
    {id: GenerateUUid(), username: 'test03', email: 'test03@gmail.com', phoneNumber: '0551234221', address: 'Bac Lieu'},
    {id: GenerateUUid(), username: 'test04', email: 'test04@gmail.com', phoneNumber: '0677127442', address: 'Soc Trang'},
    {id: GenerateUUid(), username: 'test05', email: 'test05@gmail.com', phoneNumber: '0888323442', address: 'Tay Ninh'},
]

export const movieColumn: Column[] = [
    { id: 'Poster', label: 'Poster', minWidth: 160, align: "center" },
    { id: 'Title', label: 'Name', minWidth: 160, align: "left" },
    { id: 'Type', label: 'Type', minWidth: 100, align: "left" },
    { id: 'Year', label: 'Year', minWidth: 100, align: "right" },
]

export const userColumn: Column[] = [
    { id: 'username', label: 'Username', minWidth: 160, align: "left" },
    { id: 'email', label: 'Email', minWidth: 160, align: "left" },
    { id: 'phoneNumber', label: 'Phone number', minWidth: 160, align: "left" },
    { id: 'address', label: 'Address', minWidth: 160, align: "left" },
    { id: 'action', label: 'Action', minWidth: 100, align: "center" },
]

export const movieDetailRow: Row[] = [
    { id: 'title', label: 'Title', value: '' },
    { id: 'tear', label: 'Year', value: '' },
    { id: 'rated', label: 'Rated', value: '' },
    { id: 'released', label: 'Released', value: '' },
    { id: 'writer', label: 'Writer', value: '' },
    { id: 'actors', label: 'Actors', value: '' },
    { id: 'country', label: 'Country', value: '' },
    { id: 'plot', label: 'Plot', value: '' },
]
