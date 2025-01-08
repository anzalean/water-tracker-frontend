import { ObjectId } from "mongodb";

export async function delay(ms) {
  return  Promise((resolve) => setTimeout(resolve, ms));
}


export async function fetchUser(userId) {
  await delay(50); //імітація затримки
  const data = users.find((user) => user.id === userId);
  return {data};
}

export async function fetchWater(userId) {
  await delay(50); //імітація затримки
  const data = waters.filter((water) => water.owner === userId);
  return {data};
}


const users = [
  {
    "_id": ObjectId('6761eb888fbae6e5a101547f'),
    "email": "john.doe@example.com",
    "password": "343432423324",
    "avatarURL": "https://example.com/avatar/default.png",  // заглушка
    "name": "John Doe",
    "gender": "Man",
    "weight": 99,
    "activityTime": 22,
    "desiredVolume": 10900,
    "accessToken": "cjdnvndnvdnivdinvnnvdf",
    "refreshToken": "cddinvivnidfnvndfnvjndf",
    "verification": true,
    "verificationToken": "cdsvcdvcvdffvfdvfvfd",
    "resetPasswordToken": "cdscdvcdfvfdddfvfdvfv"
  },
  {
    "_id": ObjectId('6762735ad021d7ad491eb223'),
    "email": "jane.smith@example.com",
    "password": "1234567890",
    "avatarURL": "https://example.com/avatar/default.png",  // заглушка
    "name": "Jane Smith",
    "gender": "Woman",
    "weight": 65,
    "activityTime": 30,
    "desiredVolume": 1500,
    "accessToken": "abcd1234efgh5678",
    "refreshToken": "ijkl91011mnop1213",
    "verification": false,
    "verificationToken": "yzab1819cdef2021",
    "resetPasswordToken": "ghij2223klmn2425"
  },
  {
    "_id": ObjectId('6762735ad021d7ad491eb546'),
    "email": "alex.jones@example.com",
    "password": "0987654321",
    "avatarURL": "https://example.com/avatar/default.png",  // заглушка
    "name": "Alex Jones",
    "gender": "Non-binary",
    "weight": 75,
    "activityTime": 45,
    "desiredVolume": 25000,
    "accessToken": "zxcv2627asdf2829",
    "refreshToken": "qwer3031tyui3233",
    "verification": false,
    "verificationToken": "hjkl3839qazw4041",
    "resetPasswordToken": "xswc4243edcv4445"
  },
  {
    "_id": ObjectId('6762735ad021d7ad491ebjf4'),
    "email": "emily.white@example.com",
    "password": "1122334455",
    "avatarURL": "https://example.com/avatar/default.png",  // заглушка
    "name": "Emily White",
    "gender": "Woman",
    "weight": 58,
    "activityTime": 60,
    "desiredVolume": 8000,
    "accessToken": "rfvb4647tgyn4849",
    "refreshToken": "mhju5051kiol5253",
    "verification": true,
    "verificationToken": "qazx5859rfvt6061",
    "resetPasswordToken": "edcr6263tfvb6465"
  }
];


const waters = [
  {
    "date": new Date(Date.now()+ (24 * 60 * 60 * 1000)),
    "amount": 30,
    "owner": ObjectId('6761eb888fbae6e5a101547f')
  },
  {
    "date": new Date(Date.now()+ (2 * 24 * 60 * 60 * 1000)),
    "amount": 15,
    "owner": ObjectId('6761eb888fbae6e5a101547f')
  },
  {
    "date": new Date(Date.now()+ (3 * 24 * 60 * 60 * 1000)),
    "amount": 75,
    "owner": ObjectId('6762735ad021d7ad491eb223')
  },
  {
    "date": new Date(Date.now()+ (4 * 24 * 60 * 60 * 1000)),
    "amount": 50,
    "owner": ObjectId('6762735ad021d7ad491eb223')
  },
  {
    "date": new Date(Date.now()+ (5 * 24 * 60 * 60 * 1000)),
    "amount": 30,
    "owner": ObjectId('6761eb888fbae6e5a101547f')
  },
  {
    "date": new Date(Date.now()+ (6 * 24 * 60 * 60 * 1000)),
    "amount": 15,
    "owner": ObjectId('6761eb888fbae6e5a101547f')
  },
  {
    "date": new Date(Date.now()+ (7 * 24 * 60 * 60 * 1000)),
    "amount": 75,
    "owner": ObjectId('6762735ad021d7ad491eb223')
  },
  {
    "date": new Date(Date.now()+ (8 *24 * 60 * 60 * 1000)),
    "amount": 50,
    "owner": ObjectId('6762735ad021d7ad491eb223')
  }
]

