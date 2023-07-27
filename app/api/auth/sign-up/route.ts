import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

import { db } from "@/lib/db"

export async function POST(
  req: Request,
) {
  try {
    const { name, email, password } = await req.json()
    if(!email){
      return new NextResponse("Email Required", { status: 400})
    }
    if(!password){
      return new NextResponse("Password Required", { status: 400})
    }

    

    const user = await db.user.findUnique({
      where: {
        email,
      }})

    if(user){
        return new NextResponse("User Already Exists", { status: 400 })
      }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
        data: {
          name,
          email,
          hashedPassword
        }
      })

    return NextResponse.json(newUser)

  } catch (error) {
    console.log('[BOOKS_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}