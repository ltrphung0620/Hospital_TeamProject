import { Link } from "react-router-dom";

const BlogPage = () => {
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
            <span className=" item">Tin tức</span>
          </div>
        </div>
      </section>

      <section id="latest-blog" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="post-grid d-flex flex-wrap mt-4">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <Link to="/blog/1">
                        {" "}
                        <img
                          src="/images/post-item1.jpg"
                          alt=""
                          className="post-image img-fluid border-radius-top-10"
                        />{" "}
                      </Link>
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Y khoa
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">28 tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/1">
                        Lo âu là điều bình thường xảy ra với tất cả chúng ta
                      </Link>
                    </h3>
                    <p>
                      Việc cảm thấy lo lắng, phiền muộn và đau buồn là điều bình
                      thường mỗi khi bạn được chẩn đoán mắc một bệnh nào đó...{" "}
                      <Link to="/blog/1" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <Link to="/blog/1">
                        {" "}
                        <img
                          src="/images/post-item2.jpg"
                          alt=""
                          className="post-image img-fluid border-radius-top-10"
                        />{" "}
                      </Link>
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Sức khỏe
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">26 tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/1">
                        Quyết định tốt nhất là kiểm tra sức khỏe của bạn
                      </Link>
                    </h3>
                    <p>
                      Việc cảm thấy lo lắng, phiền muộn và đau buồn là điều bình
                      thường mỗi khi bạn được chẩn đoán mắc một bệnh nào đó...{" "}
                      <Link to="/blog/1" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <Link to="/blog/1">
                        {" "}
                        <img
                          src="/images/post-item3.jpg"
                          alt=""
                          className="post-image img-fluid border-radius-top-10"
                        />{" "}
                      </Link>
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Sức khỏe răng miệng
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">4 tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/1">
                        Những cách tốt nhất để giúp răng chắc khỏe
                      </Link>
                    </h3>
                    <p>
                      Việc cảm thấy lo lắng, phiền muộn và đau buồn là điều bình
                      thường mỗi khi bạn được chẩn đoán mắc một bệnh nào đó...{" "}
                      <Link to="/blog/1" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <Link to="/blog/1">
                        {" "}
                        <img
                          src="/images/post-item4.jpg"
                          alt=""
                          className="post-image img-fluid border-radius-top-10"
                        />{" "}
                      </Link>
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Y khoa
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">28 tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/1">
                        Lo âu là điều bình thường xảy ra với tất cả chúng ta
                      </Link>
                    </h3>
                    <p>
                      Việc cảm thấy lo lắng, phiền muộn và đau buồn là điều bình
                      thường mỗi khi bạn được chẩn đoán mắc một bệnh nào đó...{" "}
                      <Link to="/blog/1" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <Link to="/blog/1">
                        {" "}
                        <img
                          src="/images/post-item5.jpg"
                          alt=""
                          className="post-image img-fluid border-radius-top-10"
                        />{" "}
                      </Link>
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Sức khỏe
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">26 tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/1">
                        Quyết định tốt nhất là kiểm tra sức khỏe của bạn
                      </Link>
                    </h3>
                    <p>
                      Việc cảm thấy lo lắng, phiền muộn và đau buồn là điều bình
                      thường mỗi khi bạn được chẩn đoán mắc một bệnh nào đó...{" "}
                      <Link to="/blog/1" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <Link to="/blog/1">
                        {" "}
                        <img
                          src="/images/post-item6.jpg"
                          alt=""
                          className="post-image img-fluid border-radius-top-10"
                        />{" "}
                      </Link>
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Sức khỏe răng miệng
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">4 tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/1">
                        Những cách tốt nhất để giúp răng chắc khỏe
                      </Link>
                    </h3>
                    <p>
                      Việc cảm thấy lo lắng, phiền muộn và đau buồn là điều bình
                      thường mỗi khi bạn được chẩn đoán mắc một bệnh nào đó...{" "}
                      <Link to="/blog/1" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    Trước
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Sau
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
