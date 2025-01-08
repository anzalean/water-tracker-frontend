import { ObjectId } from "mongodb";

export async function delay(ms) {
  return  Promise((resolve) => setTimeout(resolve, ms));
}


export async function fetchUser(userId) {
  await delay(50); //імітація затримки
  const data = users.find((user) => user.id === userId);
  return {data};
}

export async function fetchUser(userId) {
  await delay(50); //імітація затримки
  const data = waters.filter((water) => water.owner === userId);
  return {data};
}


const users = [
  {
    "id": ObjectId("23333"),
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
    "verification": "cdcdcvdfvfdvffvfvdvdf",
    "verificationToken": "cdsvcdvcvdffvfdvfvfd",
    "resetPasswordToken": "cdscdvcdfvfdddfvfdvfv"
  },
  {
    "id": ObjectId("23334"),
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
    "verification": "qrst1415uvwx1617",
    "verificationToken": "yzab1819cdef2021",
    "resetPasswordToken": "ghij2223klmn2425"
  },
  {
    "id": ObjectId("23335"),
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
    "verification": "opas3435dfgh3637",
    "verificationToken": "hjkl3839qazw4041",
    "resetPasswordToken": "xswc4243edcv4445"
  },
  {
    "id": ObjectId("23336"),
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
    "verification": "plok5455wsxc5657",
    "verificationToken": "qazx5859rfvt6061",
    "resetPasswordToken": "edcr6263tfvb6465"
  }
];


const waters = [
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 30,
    "owner": ObjectId("23333")
  },
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 15,
    "owner": ObjectId("23333")
  },
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 75,
    "owner": ObjectId("23334")
  },
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 50,
    "owner": ObjectId("23334")
  },
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 30,
    "owner": ObjectId("23333")
  },
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 15,
    "owner": ObjectId("23333")
  },
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 75,
    "owner": ObjectId("23334")
  },
  {
    "date": {
      "validate": {
        "message": "Date must be less than or equal to the current date."
      }
    },
    "amount": 50,
    "owner": ObjectId("23334")
  }
]

