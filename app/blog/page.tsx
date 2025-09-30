"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string | null;
  createdAt: string;
  author?: {
    name: string;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5C9F4] to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#512E8C] to-[#7F4FC3] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">บทความและข่าวสาร</h1>
          <p className="text-xl md:text-2xl text-[#D5C9F4] max-w-3xl mx-auto">
            แอดแวร์ซอร์ส คอนซัลติ้ง จำกัด<br />
            ข้อมูลล่าสุดเกี่ยวกับบัญชี ภาษี และการลงทุน
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
              <div className="w-16 h-16 border-4 border-[#512E8C] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#222222] text-lg">กำลังโหลดบทความ...</p>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              {posts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gradient-to-br from-[#D5C9F4] to-white p-12 rounded-2xl shadow-lg max-w-md mx-auto">
                    <div className="text-[#7F4FC3] text-6xl mb-6">📝</div>
                    <h3 className="text-2xl font-bold text-[#512E8C] mb-4">ยังไม่มีบทความ</h3>
                    <p className="text-[#222222] mb-8">เป็นคนแรกที่สร้างบทความใหม่!</p>
                    <Link 
                      href="/posts/new" 
                      className="inline-flex items-center px-8 py-4 bg-[#512E8C] text-white rounded-xl font-semibold hover:bg-[#7F4FC3] transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      สร้างบทความใหม่
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Featured Post */}
                  {posts.length > 0 && (
                    <div className="mb-16">
                      <h2 className="text-3xl font-bold text-[#222222] mb-8 text-center">บทความแนะนำ</h2>
                      <div className="bg-gradient-to-br from-[#D5C9F4] to-white rounded-2xl p-8 shadow-xl">
                        <article className="grid lg:grid-cols-2 gap-8 items-center">
                          <div>
                            <div className="flex items-center text-sm text-[#7F4FC3] mb-4">
                              <span className="bg-white px-3 py-1 rounded-full font-medium">
                                {posts[0].author?.name || "Anonymous"}
                              </span>
                              <span className="mx-3">•</span>
                              <span className="bg-white px-3 py-1 rounded-full">
                                {new Date(posts[0].createdAt).toLocaleDateString("th-TH", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            
                            <h3 className="text-3xl font-bold text-[#512E8C] mb-4 leading-tight">
                              <Link href={`/posts/${posts[0].id}`} className="hover:text-[#7F4FC3] transition-colors">
                                {posts[0].title}
                              </Link>
                            </h3>
                            
                            <p className="text-[#222222] text-lg leading-relaxed mb-6">
                              {posts[0].content?.substring(0, 200) || "ไม่มีเนื้อหา"}...
                            </p>
                            
                            <Link 
                              href={`/posts/${posts[0].id}`}
                              className="inline-flex items-center px-6 py-3 bg-[#512E8C] text-white rounded-xl font-semibold hover:bg-[#7F4FC3] transition-all duration-300 transform hover:scale-105"
                            >
                              อ่านเพิ่มเติม
                              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                          
                          <div className="bg-white rounded-xl p-8 shadow-lg">
                            <div className="w-full h-48 bg-gradient-to-br from-[#512E8C] to-[#7F4FC3] rounded-lg flex items-center justify-center">
                              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  )}

                  {/* Recent Posts */}
                  <div className="mb-16">
                    <h2 className="text-3xl font-bold text-[#222222] mb-8 text-center">บทความล่าสุด</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {posts.slice(1).map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                          <div className="h-48 bg-gradient-to-br from-[#512E8C] to-[#7F4FC3] flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center text-sm text-[#7F4FC3] mb-3">
                              <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
                                {post.author?.name || "Anonymous"}
                              </span>
                              <span className="mx-2">•</span>
                              <span className="text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString("th-TH", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-[#512E8C] mb-3 line-clamp-2 leading-tight">
                              <Link href={`/posts/${post.id}`} className="hover:text-[#7F4FC3] transition-colors">
                                {post.title}
                              </Link>
                            </h3>
                            
                            <p className="text-[#222222] line-clamp-3 mb-4 leading-relaxed">
                              {post.content || "ไม่มีเนื้อหา"}
                            </p>
                            
                            <Link 
                              href={`/posts/${post.id}`}
                              className="inline-flex items-center text-[#7F4FC3] hover:text-[#512E8C] font-semibold transition-colors"
                            >
                              อ่านเพิ่มเติม
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Call to Action */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#512E8C] to-[#7F4FC3] rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">มีเรื่องราวดีๆ อยากแชร์?</h3>
                  <p className="text-[#D5C9F4] mb-6">สร้างบทความใหม่และแบ่งปันความรู้กับชุมชนของเรา</p>
                  <Link 
                    href="/posts/new" 
                    className="inline-flex items-center px-8 py-4 bg-white text-[#512E8C] rounded-xl font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    เขียนบทความใหม่
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
