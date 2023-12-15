import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/mongoose'
import Task from '@/models/Task'

export async function GET(request, { params }) {
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

export async function DELETE(request, { params }) {
    connectDB()
    const taskDeleted = await Task.findByIdAndDelete(params.id)
    if (!taskDeleted) return NextResponse.json({
        message: "Task not found",
    }, {
        status: 404
    })
    return NextResponse.json(taskDeleted);
}

export async function PUT(request, { params }) {
    connectDB()
    const data = await request.json()
    const taskUpdated = await Task.findByIdAndUpdate(params.id, data, {
        new: true
    })
    return NextResponse.json(taskUpdated);
}