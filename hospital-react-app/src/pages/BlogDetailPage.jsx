import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../services/api';
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

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        setBlog(response); // Bỏ .data vì backend trả về trực tiếp
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!blog) return <div className="alert alert-warning">Không tìm thấy bài viết</div>;

  const categoryLabel = BLOG_CATEGORIES.find(cat => cat.value === blog.category)?.label || blog.category;

  return (
    <div className="blog-detail-page">
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/blog">Tin tức</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {blog.title}
                </li>
              </ol>
            </nav>
            <h1 className="display-4 fw-bold text-dark">{blog.title}</h1>
            <div className="blog-post-meta text-muted mt-3">
              <span className="me-3">
                <i className="far fa-calendar me-1"></i>
                {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
              </span>
              <span className="me-3">
                <i className="far fa-folder me-1"></i>
                {categoryLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <article className="blog-post">
          {blog.featuredImage && (
            <div className="blog-post-image mb-4">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="img-fluid rounded w-100"
              />
            </div>
          )}

          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage; 