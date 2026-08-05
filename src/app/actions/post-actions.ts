"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function saveGeneratedPost({
  title,
  content,
  excerpt,
  featuredImage,
  seoTitle,
  metaDescription,
  focusKeyword,
  secondaryKeywords,
  status = "DRAFT"
}: {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string;
  status?: "DRAFT" | "PUBLISHED" | "SCHEDULED";
}) {
  const session = await auth();
  let userId = session?.user?.id;

  if (!userId) {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@fortresspreservation.com" }
    });
    if (existingAdmin) {
      userId = existingAdmin.id;
    } else {
      userId = "admin-system-id";
      try {
        await prisma.user.upsert({
          where: { id: userId },
          update: {},
          create: {
            id: userId,
            name: "Admin System",
            email: "admin@fortresspreservation.com",
            role: "ADMIN"
          }
        });
      } catch (err) {
        console.error("Failed to upsert admin user:", err);
      }
    }
  }

  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") +
    "-" +
    Math.floor(Math.random() * 10000);

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || content.slice(0, 150) + "...",
        featuredImage: featuredImage || "/images/contractor_inspection.jpg",
        seoTitle,
        metaDescription,
        focusKeyword,
        secondaryKeywords,
        status,
        authorId: userId,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    return { success: true, postId: post.id, slug: post.slug };
  } catch (error: unknown) {
    console.error("Save Post Error:", error);
    return { success: false, error: "Failed to save post to database." };
  }
}

export async function getPosts(statusFilter?: "DRAFT" | "PUBLISHED" | "ALL") {
  try {
    const where = statusFilter && statusFilter !== "ALL" ? { status: statusFilter } : {};
    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, posts };
  } catch {
    return { success: false, posts: [] };
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({ where: { id } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete post." };
  }
}

export async function updatePostStatus(id: string, status: "DRAFT" | "PUBLISHED") {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });
    return { success: true, post };
  } catch {
    return { success: false, error: "Failed to update post status." };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
      },
    });
    return { success: true, post };
  } catch (error) {
    console.error("Get Post By Slug Error:", error);
    return { success: false, post: null };
  }
}

export async function updatePost(
  id: string,
  {
    title,
    content,
    excerpt,
    status,
    seoTitle,
    metaDescription,
    featuredImage,
  }: {
    title: string;
    content: string;
    excerpt?: string;
    status: "DRAFT" | "PUBLISHED";
    seoTitle?: string;
    metaDescription?: string;
    featuredImage?: string;
  }
) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        excerpt: excerpt || content.slice(0, 150) + "...",
        status,
        seoTitle,
        metaDescription,
        featuredImage,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });
    return { success: true, post };
  } catch (error) {
    console.error("Update Post Error:", error);
    return { success: false, error: "Failed to update post in database." };
  }
}

export async function addComment({
  postId,
  authorName,
  authorEmail,
  content,
}: {
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
}) {
  if (!postId || !authorName.trim() || !authorEmail.trim() || !content.trim()) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        postId,
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim().toLowerCase(),
        content: content.trim(),
      },
    });
    return { success: true, comment };
  } catch (error: any) {
    console.error("Add Comment Error:", error);
    return { success: false, error: "Failed to add comment to database." };
  }
}

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
    });
    return { success: true, comments };
  } catch (error) {
    console.error("Get Comments Error:", error);
    return { success: false, comments: [] };
  }
}

export async function loginAdmin(email: string, password: string) {
  try {
    const { signIn } = require("@/auth");
    await signIn("credentials", {
      email: email.trim(),
      password: password.trim(),
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (error: any) {
    if (error.name === "TypeError" || error.message?.includes("NEXT_REDIRECT") || error.digest?.includes("NEXT_REDIRECT")) {
      throw error; // Let Next.js handle redirect
    }
    console.error("Login Server Action Error:", error);
    return { success: false, error: "Authentication failed. Invalid email or password." };
  }
}

