import { GenerateUUid } from "./common";

export const dummyData = {
    userInfoDummy: [
        {id: GenerateUUid(), username: 'test01', email: 'test01@gmail.com', phoneNumber: '0988777666', address: 'Vinh Long'},
        {id: GenerateUUid(), username: 'test02', email: 'test02@gmail.com', phoneNumber: '0899665556', address: 'An Giang'},
        {id: GenerateUUid(), username: 'test03', email: 'test03@gmail.com', phoneNumber: '0551234221', address: 'Bac Lieu'},
        {id: GenerateUUid(), username: 'test04', email: 'test04@gmail.com', phoneNumber: '0677127442', address: 'Soc Trang'},
        {id: GenerateUUid(), username: 'test05', email: 'test05@gmail.com', phoneNumber: '0888323442', address: 'Tay Ninh'},
    ],
}