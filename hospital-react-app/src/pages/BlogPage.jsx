import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Danh sách category cứng
const BLOG_CATEGORIES = [
  { value: 'tin-tuc', label: 'Tin tức' },
  { value: 'su-kien', label: 'Sự kiện' },
  { value: 'suc-khoe', label: 'Sức khỏe' },
  { value: 'dinh-duong', label: 'Dinh dưỡng' },
  { value: 'benh-hoc', label: 'Bệnh học' },
  { value: 'tu-van', label: 'Tư vấn' }
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getAllBlogs();
        console.log('API Response:', response);
        
        setBlogs(Array.isArray(response) ? response : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to fetch blog posts');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  // Thiết kế mới cho thông báo không có bài viết
  if (!blogs.length) return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Tin tức</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className="item">Tin tức</span>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="p-5 bg-white rounded shadow-sm">
                <div className="mb-4">
                  <i className="fas fa-newspaper fa-5x" style={{ color: '#3498db', opacity: '0.8' }}></i>
                </div>
                <h2 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
                  Chưa có bài viết nào
                </h2>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  Hiện tại chưa có bài viết nào được đăng tải. 
                  Vui lòng quay lại sau để đọc những tin tức mới nhất từ chúng tôi.
                </p>
                <Link 
                  to="/" 
                  className="btn btn-primary btn-lg px-5"
                  style={{
                    backgroundColor: '#3498db',
                    borderColor: '#3498db',
                    transition: 'all 0.3s'
                  }}
                >
                  <i className="fas fa-home me-2"></i>
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Tin tức</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className="item">Tin tức</span>
          </div>
        </div>
      </section>

      <section id="latest-blog" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="post-grid d-flex flex-wrap mt-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="col-lg-4 col-md-6 col-sm-12 mb-5">
                  <div className="card-item pe-3">
                    <div className="card border-0 bg-transparent">
                      <div className="card-image position-relative">
                        <Link to={`/blog/${blog.id}`}>
                          <img
                            src={blog.featuredImage || "/images/post-item1.jpg"}
                            alt={blog.title}
                            className="post-image img-fluid border-radius-top-10"
                          />
                        </Link>
                        <span className="bg-primary-dim text-light position-absolute text-uppercase">
                          {BLOG_CATEGORIES.find(cat => cat.value === blog.category)?.label || blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-3 mt-2">
                      <div className="meta-date">
                        {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                      <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                      </h3>
                      <p>
                        {blog.excerpt}{" "}
                        <Link to={`/blog/${blog.id}`} className="text-decoration-underline">
                          <em>Đọc thêm</em>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
