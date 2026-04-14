import { db } from "@/db"
import { issues } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
    req: NextRequest,
    { params }: { params: Promise< { id: string } > }  
) => {
    try {
        const issueId = await params
        const issue = await db.query.issues.findFirst({
            where: eq(issues.id, parseInt(issueId.id)),
        })

        if (!issue) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
        }

        return NextResponse.json({ data: issue })
    } catch (error) {
        console.error('Error fetching issue:', error)
        return NextResponse.json({ error: 'Failed to fetch issue' }, { status: 500 })
    }
}