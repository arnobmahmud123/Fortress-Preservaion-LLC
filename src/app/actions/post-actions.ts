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
  const userId = session?.user?.id || "admin-system-id";

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
