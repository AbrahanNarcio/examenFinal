import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/mongoose'
import Task from '@/models/Task'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export async function GET(request: Request, { params }: Params) {
    connectDB()
    // const taskFound = await Task.findOne({
    //     title: params.id
    // })
    const taskFound = await Task.findById(params.id)
    if (!taskFound) return NextResponse.json({
        message: "Task not found",
    }, {
        status: 404
    })
    return NextResponse.json(taskFound);
}

export async function DELETE(request: Request, { params }: Params) {
    connectDB()
    const taskDeleted = await Task.findByIdAndDelete(params.id)
    if (!taskDeleted) return NextResponse.json({
        message: "Task not found",
    }, {
        status: 404
    })
    return NextResponse.json(taskDeleted);
}

export async function PUT(request: Request, { params }: Params) {
    connectDB()
    const data = await request.json()
    const taskUpdated = await Task.findByIdAndUpdate(params.id, data, {
        new: true
    })
    return NextResponse.json(taskUpdated);
}