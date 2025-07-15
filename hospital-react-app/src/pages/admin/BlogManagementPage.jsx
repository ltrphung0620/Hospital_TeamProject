import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { getAllBlogsAdmin, createBlog, updateBlog, deleteBlog } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './BlogManagementPage.css';

const BlogManagementPage = () => {
  // Thêm danh sách category cứng
  const BLOG_CATEGORIES = [
    { value: 'tin-tuc', label: 'Tin tức' },
    { value: 'su-kien', label: 'Sự kiện' },
    { value: 'suc-khoe', label: 'Sức khỏe' },
    { value: 'dinh-duong', label: 'Dinh dưỡng' },
    { value: 'benh-hoc', label: 'Bệnh học' },
    { value: 'tu-van', label: 'Tư vấn' }
  ];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState(''); // Không set mặc định là Draft nữa

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogsAdmin();
      console.log('Fetched blogs:', response);
      
      setBlogs(Array.isArray(response) ? response : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message || 'Failed to fetch blogs');
      setLoading(false);
    }
  };

  const handleShowModal = (blog = null) => {
    if (blog) {
      console.log('Editing blog:', blog);
      setEditingBlog(blog);
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setCategory(blog.category || '');
      setFeaturedImage(blog.featuredImage || '');
      setExcerpt(blog.excerpt || '');
      setStatus(blog.status || '');
    } else {
      setEditingBlog(null);
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setFeaturedImage('');
    setExcerpt('');
    setStatus(''); // Không set mặc định là Draft nữa
    setEditingBlog(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    
    if (!status) {
      setError('Vui lòng chọn trạng thái bài viết');
      return;
    }

    try {
      const blogData = {
        title,
        content,
        category,
        featuredImage: featuredImage || '',
        excerpt: excerpt || '',
        status
      };

      console.log('Sending blog data:', blogData);

      let response;
      if (editingBlog) {
        console.log('Updating blog with ID:', editingBlog.id);
        response = await updateBlog(editingBlog.id, blogData);
        console.log('Update response:', response);
      } else {
        response = await createBlog(blogData);
        console.log('Create response:', response);
      }

      // Nếu không có lỗi, đóng modal và refresh danh sách
      handleCloseModal();
      await fetchBlogs();
      
    } catch (err) {
      console.error('Error saving blog:', err);
      setError(err.response?.data?.message || 'Không thể lưu bài viết. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        fetchBlogs();
      } catch (err) {
        setError('Failed to delete blog');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý bài viết</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          <i className="fas fa-plus-circle me-2"></i>Thêm bài viết mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <div className="blog-title-cell">
                  <strong>{blog.title}</strong>
                  <div className="row-actions">
                    <span className="edit">
                      <a href="#" onClick={(e) => { e.preventDefault(); handleShowModal(blog); }}>
                        Chỉnh sửa
                      </a> | 
                    </span>
                    <span className="delete">
                      <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(blog.id); }}>
                        Xóa
                      </a>
                    </span>
                  </div>
                </div>
              </td>
              <td>{blog.category}</td>
              <td>
                <span className={`status-badge ${blog.status.toLowerCase()}`}>
                  {blog.status === 'Published' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </td>
              <td>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(blog)}
                >
                  <i className="fas fa-edit me-1"></i>Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(blog.id)}
                >
                  <i className="fas fa-trash-alt me-1"></i>Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" className="blog-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBlog ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="blog-editor-container">
            <div className="editor-main">
              <Form onSubmit={handleSubmit}>
                {/* Di chuyển phần chọn trạng thái lên đầu form */}
                <Form.Group className="mb-4">
                  <Form.Label className="required">Trạng thái bài viết</Form.Label>
                  <div className="status-options">
                    <Form.Check
                      inline
                      type="radio"
                      id="status-published"
                      name="status"
                      label="Xuất bản"
                      checked={status === 'Published'}
                      onChange={() => setStatus('Published')}
                      className="status-radio"
                      required
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="status-draft"
                      name="status"
                      label="Bản nháp"
                      checked={status === 'Draft'}
                      onChange={() => setStatus('Draft')}
                      className="status-radio"
                      required
                    />
                  </div>
                  <div className="status-description mt-2">
                    {!status && (
                      <small className="text-danger">
                        Vui lòng chọn trạng thái bài viết
                      </small>
                    )}
                    {status === 'Published' && (
                      <small className="text-success">
                        <i className="fas fa-info-circle me-1"></i>
                        Bài viết sẽ được hiển thị công khai sau khi xuất bản
                      </small>
                    )}
                    {status === 'Draft' && (
                      <small className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>
                        Bài viết sẽ được lưu dưới dạng bản nháp và không hiển thị công khai
                      </small>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="required">Tiêu đề bài viết</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề bài viết"
                    className="title-input"
                    required
                  />
                </Form.Group>

                {error && (
                  <div className="alert alert-danger mb-4">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <div className="modal-footer border-0 px-0">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Hủy
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={!title || !content || !category || !status}
                  >
                    {editingBlog ? 'Cập nhật' : 'Tạo bài viết'}
                  </Button>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label className="required">Danh mục</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Tóm tắt bài viết"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="URL ảnh đại diện"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    init={{
                      height: 600,
                      menubar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                        'fullscreen', 'insertdatetime', 'media', 'table', 'code',
                        'help', 'wordcount', 'emoticons'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | image media link emoticons | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      language: 'vi',
                      branding: false,
                      promotion: false,
                      skin: 'oxide',
                      icons: 'thin',
                      file_picker_types: 'image',
                      image_title: true,
                      automatic_uploads: true,
                      images_upload_handler: async (blobInfo, progress) => {
                        try {
                          const formData = new FormData();
                          formData.append('file', blobInfo.blob(), blobInfo.filename());

                          const token = localStorage.getItem('authToken');
                          if (!token) {
                            throw new Error('Không tìm thấy token xác thực');
                          }

                          const response = await fetch(`${import.meta.env.VITE_API_URL}/Image/upload`, {
                            method: 'POST',
                            body: formData,
                            headers: {
                              'Authorization': `Bearer ${token}`
                            }
                          });

                          if (!response.ok) {
                            const errorData = await response.text();
                            throw new Error(`Lỗi từ server: ${errorData}`);
                          }

                          const data = await response.json();
                          return data.location;
                        } catch (error) {
                          console.error('Lỗi khi tải lên hình ảnh:', error);
                          throw new Error(`Lỗi tải lên: ${error.message}`);
                        }
                      },
                      images_reuse_filename: true,
                      browser_spellcheck: true,
                      contextmenu: false,
                      custom_elements: 'quillbot-extension',
                      extended_valid_elements: 'quillbot-extension[*]',
                      valid_children: '+body[quillbot-extension]',
                      content_security_policy: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; img-src 'self' data: blob: http://localhost:5247",
                      referrer_policy: 'origin'
                    }}
                    value={content}
                    onEditorChange={(newContent) => setContent(newContent)}
                  />
                </Form.Group>
              </Form>
            </div>

            <div className="editor-sidebar">
              <div className="sidebar-section">
                <h5>Xuất bản</h5>
                <div className="d-grid gap-2">
                  <Button 
                    variant={status === 'Published' ? 'success' : 'primary'} 
                    onClick={(e) => {
                      e.preventDefault();
                      setStatus('Published');
                      handleSubmit();
                    }}
                    className="w-100"
                    disabled={!title || !content || !category}
                  >
                    {editingBlog ? 'Cập nhật và xuất bản' : 'Xuất bản ngay'}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={(e) => {
                      e.preventDefault();
                      setStatus('Draft');
                      handleSubmit();
                    }}
                    className="w-100"
                  >
                    Lưu nháp
                  </Button>
                </div>
              </div>

              <div className="sidebar-section">
                <h5>Danh mục</h5>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="sidebar-section">
                <h5>Ảnh đại diện</h5>
                <div className="featured-image-preview">
                  {featuredImage && (
                    <img src={featuredImage} alt="Preview" className="img-fluid mb-2" />
                  )}
                </div>
                <Form.Control
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="URL ảnh đại diện"
                />
              </div>

              <div className="sidebar-section">
                <h5>Tóm tắt</h5>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Nhập tóm tắt bài viết"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BlogManagementPage; 