import BlogCard from "./blog-card.jsx";

const RecentPostsGrid = ({ blogs, onBlogClick }) => {
    if (!blogs || blogs.length === 0) return null;

    return (
        <div className="grid grid-cols-2 gap-4 sm:hidden">
            {blogs.map((blog, index) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={index}
                    size="small"
                    onClick={onBlogClick}
                />
            ))}
        </div>
    );
};

export default RecentPostsGrid;
