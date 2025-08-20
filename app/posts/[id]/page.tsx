export const dynamic = "force-dynamic"; // This disables SSG and ISR

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  // Server action to delete the post
  async function deletePost() {
    "use server";

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    redirect("/posts");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5C9F4] to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#512E8C] to-[#7F4FC3] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">บทความ</h1>
          <p className="text-xl text-[#D5C9F4]">แอดแวร์ซอร์ส คอนซัลติ้ง จำกัด</p>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Post Header */}
            <div className="bg-gradient-to-r from-[#512E8C] to-[#7F4FC3] p-8 text-white">
              <div className="flex items-center text-[#D5C9F4] text-sm mb-4">
                <span className="bg-white text-[#512E8C] px-3 py-1 rounded-full font-medium">
                  {post.author?.name || "Anonymous"}
                </span>
                <span className="mx-3">•</span>
                <span className="bg-white text-[#512E8C] px-3 py-1 rounded-full">
                  {new Date(post.createdAt).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Post Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                {post.content ? (
                  <div className="text-[#222222] leading-relaxed space-y-6">
                    {post.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-[#7F4FC3] text-6xl mb-4">📝</div>
                    <p className="text-xl text-gray-500 italic">ไม่มีเนื้อหาในบทความนี้</p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-8 py-3 bg-[#512E8C] text-white rounded-xl font-semibold hover:bg-[#7F4FC3] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              กลับไปยังบทความ
            </Link>
            
            <form action={deletePost} className="inline">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                ลบบทความ
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
