import React from "react";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import UserContext from "../UserContext";

const Home = () => {

   let {user} = useContext(UserContext)
  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      author: "John Doe",
      date: "June 10, 2026",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      description:
        "Learn the fundamentals of React and start building interactive user interfaces.",
    },
    {
      id: 2,
      title: "Understanding JavaScript Closures",
      author: "Jane Smith",
      date: "June 8, 2026",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      description:
        "Closures are one of the most important concepts in JavaScript. Let's explore them.",
    },
    {
      id: 3,
      title: "Mastering Tailwind CSS",
      author: "Alex Johnson",
      date: "June 5, 2026",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      description:
        "Build beautiful and responsive user interfaces quickly using Tailwind CSS.",
    },
    {
      id: 4,
      title: "Node.js Best Practices",
      author: "Sarah Wilson",
      date: "June 2, 2026",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      description:
        "Discover the best practices to write clean and maintainable Node.js applications.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar/>
      {/* Hero Section */}

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {user&&user.name && <h1>welcome {user.name}</h1>}
          <h1 className="text-5xl font-bold mb-4">
            Welcome to DevBlog
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore the latest articles on web development, programming,
            and technology.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">
                  By {blog.author} • {blog.date}
                </p>

                <h3 className="text-xl font-semibold mb-3">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {blog.description}
                </p>

                <button className="text-blue-600 font-medium hover:text-blue-800">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;