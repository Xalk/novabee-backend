import { Document } from 'mongoose'
import { Request } from 'express'

export interface IUser extends Document{
    fullName: string
    email: string
    passwordHash: string
    _doc: object
}

export interface IReqGetMe extends Request {
    userId?: string
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

export interface ISensor extends Document{
    temperature: string
    humidity: string
    createdAt: Date
    _doc: object
}

export interface IApiary extends Document{
    name:string
    description:string
    startSeason:Date
    user: string
    _doc: object
}

export interface IReqCreateApiary extends Request {
    userId?: string
}
export interface IReqUpdateApiary extends Request {
    userId?: string
}
