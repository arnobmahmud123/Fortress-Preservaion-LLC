"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function saveGeneratedPost({
  title,
  content,
  seoTitle,
  metaDescription,
  focusKeyword,
  secondaryKeywords,
  status = "DRAFT"
}: {
  title: string
  content: string
  seoTitle?: string
  metaDescription?: string
  focusKeyword?: string
  secondaryKeywords?: string
  status?: "DRAFT" | "PUBLISHED" | "SCHEDULED"
}) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized. Please log in as an Admin." }
  }

  // Generate a basic slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") + "-" + Date.now()

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        seoTitle,
        metaDescription,
        focusKeyword,
        secondaryKeywords,
        status,
        authorId: session.user.id,
      }
    })

    return { success: true, postId: post.id }
  } catch (error: unknown) {
    console.error("Save Post Error:", error)
    return { success: false, error: "Failed to save post to database." }
  }
}
