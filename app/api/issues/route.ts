import { db } from "@/db";
import { issues } from "@/db/schema";
import { getCurrentUser } from "@/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const issues = await db.query.issues.findMany({});
    return NextResponse.json({ issues });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }


    const newIssueData = await req.json();
    newIssueData.reporterId = user.id // Set the reporterId to the current user's ID

    const [newIssue] = await db
    .insert(issues)
    .values(newIssueData)
    .returning()

    return NextResponse.json({ issue: newIssue }, { status: 201 })
  } catch (error) {
    console.error("Error creating issue:", error)
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 })
  }
}