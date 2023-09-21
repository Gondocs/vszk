import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto text-white">
          <h1 className="text-5xl font-semibold">Welcome to My Website</h1>
          <p className="text-lg">Your go-to source for amazing content.</p>
        </div>
      </header>

      {/* Featured Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-semibold mb-4">Featured Article</h2>
              <p className="text-gray-700">
                Discover our latest and greatest article that will change your life.
              </p>
              <a
                href="%#"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/400x300"
                alt="Featured Article"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-8 text-center">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Blog Post 1 Title
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              </p>
              <a
                href="%#"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Blog Post 2 Title
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              </p>
              <a
                href="#%"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Blog Post 3 Title
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              </p>
              <a
                href="#%"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for the latest updates and exclusive content.
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white w-full p-3 rounded-full"
            />
            <button
              className="bg-yellow-400 text-blue-600 px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-white mt-4"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 py-4">
        <div className="container mx-auto text-center text-white">
          <p className="text-lg">&copy; 2023 My Website</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
