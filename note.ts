// const heroPower: Array<number> = [];
// const studentsEmail: Array<string> = [];

// const superHeros: string[] = [];
// const studentsAge: number[] = [];

// type userType ={
//     name:string,
//     age: number,
//     isActive:boolean
// }
// const allUsers:userType[]=[];
// allUsers.push({
//     name:'manish',
//     age:20,
//     isActive:true
// })

// const areaNumber :number[][]=[
//     [10,20,6222],
//     [5,55,687456,23,34]
// ];

// superHeros.push("superman");
// studentsAge.push(25);
// studentsEmail.push("bahekl.llkj@gmailc.om");

// //----------- Union
// type user ={
//     name:string,
//     age:number
// }
// type admin ={
//     username:string,
//     age:number
// }
// let manish:user|admin={
//     name:"manish kumar baghel",
//     age:30
// }
// manish={
//     username:"dfadfsdsafdasf ffdafsd",
//     age:25
// }

// function getUserDetails(id:number|string) {
//     console.log(id);
// }
// getUserDetails("5");
// getUserDetails(5);


// let useDetail:string []=["dfss",'fafdsa'];
// let userDetial2:number[]=[1,5];
// let userdetial3:(string|number|boolean)[]=[12,58,9, "dsffa","dsafdafa","dsffdsaa","dsfsdsdf",'dfsdsf',89, true,false,true, 77878];
// let pi:3.75 = 3.75;

// //----------- interface
// interface authUser{
//     email:string,
//     password:string
// }
// let getuser:authUser={email:'dafs', password:'adfsafs'}
// console.log(getuser);

// // --------- generics
// function identity<Type>(val:Type):Type { 
//     return val;
// }

// function shortmode<T>(val: T):T{
//     return val;
// }

// interface userdata {
//     email:string,
//     name:string,
// }

// function useuserdata<T, U extends userdata>(valone:T, valtwo: U):Object{
//     return{
//         valone,
//         valtwo
//     }
// }
// useuserdata(3, {email:'fdafas', name:'manish'});

// // ----------- package
// "@emotion/react": "^11.11.4",
// "@emotion/styled": "^11.11.5",
// "@mui/styles": "^5.16.0",
// ------- in dot env
// BACKEND_URL=https://everlywell-node-api.onrender.com