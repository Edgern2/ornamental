"use server"
import clientPromise from "../../lib/mongodb";
import { BSON, EJSON, ObjectId } from 'bson';
export async function checkCode(code){
  console.log(code)
  const client = await clientPromise;
  const db = client.db("Ornamental");
  const room = await db
    .collection("rooms")
    .findOne({"code":parseInt(code)})
  return (room!=null)

}
export async function createRoom(code, name, endDate, budget, description, maxQ, questions){
  let schema={"code":code.toString(),
    "name":name,
    "ornaments":[],
    "secret_santa":{
      "description":description,
      "budget":budget,
      "started":false,
      "end_date":endDate,
      "user_pair":[
      ]
    },
    "admin_id":"",
    "max_questions":maxQ,
    "current_question":0,
    "questions":questions,
    "list_of_users":[],
    "gifts":[],

  }
  const client = await clientPromise;
  const db = client.db("Ornamental");
  let bxon=EJSON.stringify(await db
    .collection("rooms")
    .insertOne(schema))
  console.log(bxon)
  return bxon
}
export async function createUser(password, name){
  let schema={
    "room": 0,
    "name": name,
    "password": password,
    "target": "" ,
    "general_information": "",
    "nose_color":0.5,
    "giftbought": false,
    "is_admin": false,
    "answers":[]
  }
  const client = await clientPromise;
  const db = client.db("Ornamental");
  return EJSON.stringify(await db
    .collection("users")
    .insertOne(schema))

}
export async function getUser(userid){
  userid=EJSON.parse(userid)

  const client = await clientPromise;
  const db = client.db("Ornamental");
  let user=await db
    .collection("users")
    .findOne({ _id: userid })
  user=EJSON.stringify(user)
  return user
}
export async function getRoom(roomid){
  roomid=EJSON.parse(roomid)

  const client = await clientPromise;
  const db = client.db("Ornamental");
  let room=await db
    .collection("rooms")
    .findOne({ "code": roomid })
  room=EJSON.stringify(room)
  return room
}
export async function addPlayer(playerid, roomcode){
  playerid=EJSON.parse(playerid)
  const client = await clientPromise;
  const db = client.db("Ornamental");
  let user=await db
    .collection("users")
    .updateOne({ _id: playerid },
  { $set: { 'room': roomcode.toString() } })
  return await db.collection("rooms").updateOne({"code":roomcode.toString()},{$push:{'list_of_users':playerid}})
}

export async function getNoPlayers(roomcode ){
  const client = await clientPromise;
  const db = client.db("Ornamental");
  let user=await db
    .collection("rooms")
    .findOne({"code":roomcode.toString()})
  return (user["list_of_users"].length)
}
export async function checkPlayer(username, password){
  const client = await clientPromise;
  const db = client.db("Ornamental");
  let user=await db
    .collection("users")
    .findOne({"name":username})
  console.log(user)
  if (user===null||user["password"]!=password){return false
  }else{
    return EJSON.stringify(user);
  }
}

export async function addOrnament(roomcode, author, position, ornamentId){
  author=EJSON.parse(author)
  const client = await clientPromise;
  const db = client.db("Ornamental");
  return await db.collection("rooms").updateOne({"code":roomcode.toString()},{$push:{'ornaments':{"authorid":author,"position":position,"ornament_id":ornamentId}}})

}

export async function addGift(roomcode, author, recepient, position, rotation,shape, size ){
  author=EJSON.parse(author)
  recepient=EJSON.parse(recepient)
  const client = await clientPromise;
  const db = client.db("Ornamental");
  return await db.collection("rooms").updateOne({"code":roomcode.toString()},{$push:{'ornaments':{"authorid":author,"recepient":recepient,"position":position,"rotation":rotation, "shape":shape,"size":size}}})

}
