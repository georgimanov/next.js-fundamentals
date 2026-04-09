import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'

export const getUserByEmail = async (email: string) => {
    try {
        const users = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        
        return users[0] || null
        
    } catch (error) {
        console.error('Error fetching user by email:', error)
        return null
    }
}

export const getCurrentUser = async () => {
    await mockDelay(500) // Simulate 
    
    // a delay for demonstration purposes
    const session = await getSession();
    if (!session) return null

    try {
        const users = await db
        .select()
        .from(users)
        .where(eq(users.id, session.userId))
        
        return users[0] || null
        
    } catch (error) {
        console.error('Error fetching user by email:', error)
        return null
    }
    
    return '';
}