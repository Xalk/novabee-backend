import {Document} from 'mongoose'
import {Request} from 'express'

export interface IUser extends Document {
    fullName: string
    email: string
    passwordHash: string
    role: "user" | "admin"
    cart: {
        items:[]
    }
    _doc: object
}

export interface IReqGetMe extends Request {
    userId?: string
}
export interface IReqCart extends Request {
    userId?: string
    productId?: string
}



export interface INewUser {
    fullName: string
    email: string
    password: string
}

export interface IDecodedToken {
    _id?: string
    newUser?: INewUser
    iat: number
    exp: number
}

export interface ISensor extends Document {
    temperature: string
    humidity: string
    createdAt: Date
    deviceID: string
    _doc: object
}

export interface IApiary extends Document {
    name: string
    description: string
    startSeason: Date
    user: string
    beehives: IBeehive[]
    _doc: object
}

export interface IReqApiary extends Request {
    userId?: string
}


export interface IBeehive extends Document {
    name: string
    description: string
    deviceID: string
    apiary: string
    _doc: object
}

export interface IReqBeehive extends Request {
    userId?: string
}

export interface IQueen extends Document {
    name: string
    description: string
    introducedFrom: Date
    reQueenedFrom: Date
    isOut: Boolean
    beehive: string
    _doc: object
}


export interface IProduct extends Document {
    title: string
    description: string
    price:number,
    imageUrl: string
    _doc: object
}

export interface IOrder extends Document {
    products: IProduct[]
    user: IUser
    address: Object
    status: String
    _doc: object
}