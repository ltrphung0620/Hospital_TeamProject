import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
  Badge,
  Dropdown
} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import './BlogManagement.css';

const BlogManagementPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Cách phòng ngừa bệnh cúm mùa',
      category: 'Sức khỏe',
      status: 'published',
      author: 'Dr. Nguyễn Văn A',
      date: '2024-03-20',
      featured_image: '/images/blog/flu-prevention.jpg'
    },
    // Thêm các bài viết mẫu khác
  ]);

  const [activeTab, setActiveTab] = useState('editor');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    'Sức khỏe',
    'Dinh dưỡng',
    'Tin tức y tế',
    'Bệnh thường gặp',
    'Chăm sóc trẻ em',
    'Sống khỏe'
  ];

  const handleEditorChange = (content) => {
    setPostContent(content);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (!postTitle.trim()) {
      toast.error('Vui lòng nhập tiêu đề bài viết');
      return;
    }
    if (!postContent.trim()) {
      toast.error('Vui lòng nhập nội dung bài viết');
      return;
    }
    if (!selectedCategory) {
      toast.error('Vui lòng chọn danh mục');
      return;
    }

    const newPost = {
      id: Date.now(),
      title: postTitle,
      content: postContent,
      category: selectedCategory,
      status: 'published',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      featured_image: featuredImage
    };

    setPosts([newPost, ...posts]);
    toast.success('Đăng bài viết thành công!');
    resetForm();
  };

  const resetForm = () => {
    setPostTitle('');
    setPostContent('');
    setSelectedCategory('');
    setFeaturedImage(null);
  };

  const handleSaveDraft = () => {
    // Implement save draft logic
    toast.info('Đã lưu bản nháp');
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Quản lý bài viết</h2>
          <div className="d-flex mb-4">
            <Button
              variant={activeTab === 'editor' ? 'primary' : 'light'}
              className="me-2"
              onClick={() => setActiveTab('editor')}
            >
              <i className="fas fa-edit me-2"></i>
              Viết bài mới
            </Button>
            <Button
              variant={activeTab === 'list' ? 'primary' : 'light'}
              onClick={() => setActiveTab('list')}
            >
              <i className="fas fa-list me-2"></i>
              Danh sách bài viết
            </Button>
          </div>
        </Col>
      </Row>

      {activeTab === 'editor' ? (
        <Row>
          <Col lg={9}>
            <Card className="mb-4">
              <Card.Body>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Thêm tiêu đề"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="form-control-lg border-0 mb-3"
                    style={{ fontSize: '1.5rem' }}
                  />
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | image media | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      language: 'vi',
                      branding: false,
                      promotion: false
                    }}
                    value={postContent}
                    onEditorChange={handleEditorChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="mb-3">
              <Card.Header>Đăng bài</Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={handlePublish}>
                    <i className="fas fa-paper-plane me-2"></i>
                    Đăng bài
                  </Button>
                  <Button variant="light" onClick={handleSaveDraft}>
                    <i className="fas fa-save me-2"></i>
                    Lưu nháp
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header>Danh mục</Card.Header>
              <Card.Body>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header>Ảnh đại diện</Card.Header>
              <Card.Body>
                {featuredImage ? (
                  <div className="position-relative mb-3">
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="img-fluid rounded"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => setFeaturedImage(null)}
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded">
                    <i className="fas fa-image fa-2x mb-3 text-muted"></i>
                    <p className="mb-0">Chọn ảnh đại diện</p>
                  </div>
                )}
                <div className="d-grid">
                  <Button variant="outline-primary" className="mt-2">
                    <i className="fas fa-upload me-2"></i>
                    Tải ảnh lên
                    <Form.Control
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <Row className="mb-3">
              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="published">Đã đăng</option>
                  <option value="draft">Bản nháp</option>
                  <option value="trash">Thùng rác</option>
                </Form.Select>
              </Col>
            </Row>

            <Table responsive hover>
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Tiêu đề</th>
                  <th>Tác giả</th>
                  <th>Danh mục</th>
                  <th>Trạng thái</th>
                  <th>Ngày đăng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        {post.featured_image && (
                          <img
                            src={post.featured_image}
                            alt=""
                            className="me-2 rounded"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                        )}
                        <div>
                          <div className="fw-bold">{post.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>{post.author}</td>
                    <td>{post.category}</td>
                    <td>
                      <Badge bg={post.status === 'published' ? 'success' : 'warning'}>
                        {post.status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                      </Badge>
                    </td>
                    <td>{post.date}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="light" size="sm">
                          <i className="fas fa-ellipsis-h"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <i className="fas fa-edit me-2"></i>
                            Chỉnh sửa
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i className="fas fa-eye me-2"></i>
                            Xem trước
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="text-danger">
                            <i className="fas fa-trash me-2"></i>
                            Xóa
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BlogManagementPage; 