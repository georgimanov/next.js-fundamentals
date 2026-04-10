import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'

export const getUserByEmail = async (email: string) => {
    try {
        const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        
        return result[0] || null
        
    } catch (error) {
        console.error('Error fetching user by email:', error)
        return null
    }
}

export const getCurrentUser = cache(async () => {
    await mockDelay(500) // Simulate 
    
    // a delay for demonstration purposes
    const session = await getSession();
    if (!session) return null

    try {
        const result = await db
        .select()
        .from(users)
        .where(eq(users.id, session.userId))
        
        return result[0] || null
        
    } catch (error) {
        console.error('Error fetching user by email:', error)
        return null
    }
    
    return '';
})

export const getIssuesForCurrentUser = async () => {
    await mockDelay(500) // Simulate a delay for demonstration purposes
    const session = await getSession();
    if (!session) return []

    try {
        const issuesList = await db
        .query
        .issues
        .findMany({
            with: {
                user: true
            },
            orderBy: (issues, { desc }) => [desc(issues.createdAt)]
        })
        
        return issuesList
        
    } catch (error) {
        console.error('Error fetching issues for current user:', error)
        throw new Error('Failed to fetch issues for current user')
    }
}


export const getIssue = async (id: number) => {
'use cache' // Enable caching for this function
    cacheTag('issues');
  try {
    await mockDelay(700)
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: {
        user: true,
      },
    })

    return issue
  } catch (e) {
    console.error(e)
    return null
  }
}