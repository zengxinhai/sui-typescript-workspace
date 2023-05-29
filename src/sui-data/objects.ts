import type {
  ObjectArg,
  SuiObjectRef,
} from "@mysten/sui.js"

export type ObjectCallArg = {
  Object: ObjectArg
}

const createObjectCallArg = (objectId: string, version: string, digest: string): ObjectCallArg => {
return {
    Object: {
      ImmOrOwned: {objectId, version, digest }
    }
  }
}

export const gasCoin1 : SuiObjectRef = {
  objectId: '0x4f358198b3a8a3892b29b0ccceb488826d742c9db5c6ce0b7936596aa23542f1',
  version: '1882444',
  digest: 'JD9r91CeFJU4q9HdUoimVDxKYifUhE8F2H4aNi8cGx7t',
}

export const gasCoin2 : SuiObjectRef = {
  objectId: '0x5021b461a0acf93928cf1010e6048a489da30b4d19f46558b714c5ecc7924d66',
  version:  '1882444',
  digest:  '5R2m2ELfFdoDg24MwNKozX9JZVJA4h5tbdBqqoqjeMnn'
}

export const obj1 = createObjectCallArg(
  '0x1a36229368f7d0fb5efca6a7f3887fa4f1fe00b117d110d48a96de1734f5008b',
  '392700',
  'H1eFU1KcMsZz88gCwUi6vQccX4c5w2vLswCmpddyEvyS'
)

export const obj2 = createObjectCallArg(
 '0x3d236beb478b4c45eae7567b8196a0bd69185ac5e5de919dfae340915077157c',
  '858230',
  '7EmjaBzKckxj8Z6ak72F7cJVDTGmnHkR24KBE2u4hVMJ'
)
