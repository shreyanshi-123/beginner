import React from 'react';
import './List-of-blogs.css';
import blog1 from './../../../Assets/Images/blog-1.jpg'
import blog2 from './../../../Assets/Images/blog-2.jpg'
import blog3 from './../../../Assets/Images/blog-3.jpg'
import blog4 from './../../../Assets/Images/blog-4.jpg'
import blog5 from './../../../Assets/Images/blog-5.jpg'
import blog6 from './../../../Assets/Images/blog-6.jpg'

// List of blogs
const blogs = [
  {
    img: blog1, // Replace with actual image URL
    excerpt: "This is an excerpt from the first blog post.",
    date: "December 25, 2024",
    author: "John Doe",
    title: "The First Blog Post"
  },
  {
    img: blog2, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog3, // Replace with actual image URL
    excerpt: "This is an excerpt from the first blog post.",
    date: "December 25, 2024",
    author: "John Doe",
    title: "The First Blog Post"
  },
  {
    img: blog4, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog5, // Replace with actual image URL
    excerpt: "This is an excerpt from the first blog post.",
    date: "December 25, 2024",
    author: "John Doe",
    title: "The First Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  },
  {
    img: blog6, // Replace with actual image URL
    excerpt: "This is an excerpt from the second blog post.",
    date: "December 26, 2024",
    author: "Jane Smith",
    title: "The Second Blog Post"
  }
  // Add more blog objects here...
];

function List() {
  return (
    <div className="blog-list max-w-6xl m-auto grid   grid-cols-4 grid-rows-1 py-[50px]">
      {blogs.map((blog, index) => (
        <div key={index} className="blog-item p-4 gap-y-2 flex flex-col">
          {/* Image */}
          <img src={blog.img} alt={blog.title} className="blog-image rounded-xl " />
          
          {/* Blog Title */}
          <h2 className="blog-title text-center text-lg font-semibold underline">{blog.title}</h2>
          
          {/* Blog Excerpt */}
          <p className="blog-excerpt text-[13px] text-center">{blog.excerpt}</p>
          
          {/* Blog Metadata */}
          <div className="blog-meta flex justify-center gap-2">
          <span className="blog-author text-[13px] underline">{blog.author}</span>
            <span className="blog-date text-[13px]">{blog.date}</span> 
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
