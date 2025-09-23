import { BlogAPI, withApiError } from "@/lib/api";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const [post, err] = await withApiError(BlogAPI.get(resolvedParams.id));

  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Failed to load post
          </h1>
          <p className="text-red-700 dark:text-red-300 mb-4">{err.message}</p>
          <Button 
            onClick={() => window.history.back()}
            variant="secondary"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  if (!post) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4 lg:px-6">
        <article className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <span className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${post.status === 'published' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : post.status === 'draft'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }
              `}>
                {post.status}
              </span>
              <time 
                dateTime={post.createdAt}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {post.title}
            </h1>
            
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(post.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none prose-lg">
              <div 
                className="whitespace-pre-wrap leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Add a comment
            </h2>
          </div>
          
          {/* PUBLIC_INTERFACE: client-side submit */}
          <form action={`/blogs/${post.id}/comment`} method="post" className="space-y-4">
            <TextArea 
              name="content" 
              label="Comment" 
              placeholder="Share your thoughts about this post..."
              required 
              rows={4}
              helpText="Your comment will be reviewed before being published."
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comments are moderated and may take some time to appear.
              </p>
              <Button 
                type="submit"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                }
              >
                Submit Comment
              </Button>
            </div>
          </form>
        </section>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button 
            variant="secondary"
            onClick={() => window.history.back()}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Back
          </Button>
          
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-all duration-200"
          >
            All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
