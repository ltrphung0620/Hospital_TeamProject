import React from "react";
import { Link } from "react-router-dom";

const BlogSinglePage = () => {
  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Chi tiết tin tức</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className=" item">Chi tiết tin tức</span>
          </div>
        </div>
      </section>

      <section className="padding-small">
        <div className="container">
          <div className="row">
            <div className="">
              <div className="post-content ">
                <h2 className="mt-5 text-capitalize">
                  Làm thế nào để thư giãn và bình tĩnh trong những tình huống
                  khó khăn
                </h2>
                <p className="mt-5">
                  Đối mặt với những khó khăn trong cuộc sống là điều không thể
                  tránh khỏi. Tuy nhiên, việc giữ được sự bình tĩnh và thư giãn
                  sẽ giúp chúng ta có cái nhìn sáng suốt hơn để giải quyết vấn
                  đề. Căng thẳng kéo dài không chỉ ảnh hưởng đến sức khỏe tinh
                  thần mà còn tác động tiêu cực đến sức khỏe thể chất. Vì vậy,
                  học cách kiểm soát cảm xúc và giữ cho tâm trí thanh thản là
                  một kỹ năng quan trọng.
                </p>
                <div className="post-image mt-5">
                  <img
                    src="/images/single-post-item.jpg"
                    alt="post-image"
                    className="img-fluid"
                  />
                </div>
                <h4 className="mt-5">
                  Làm thế nào để nhìn thấy mặt tươi sáng của mọi việc
                </h4>
                <p className="mt-3">
                  Một trong những cách hiệu quả để đối phó với căng thẳng là tập
                  trung vào những mặt tích cực của cuộc sống. Thay vì chìm đắm
                  trong những suy nghĩ tiêu cực, hãy thử tìm kiếm những điểm
                  sáng, dù là nhỏ nhất, trong mọi tình huống. Điều này không có
                  nghĩa là chúng ta phớt lờ khó khăn, mà là chọn một góc nhìn
                  khác, một góc nhìn mang lại hy vọng và sức mạnh để tiếp tục
                  tiến về phía trước. Thực hành lòng biết ơn hàng ngày cũng là
                  một phương pháp hữu hiệu để nuôi dưỡng tinh thần lạc quan.
                </p>
                <blockquote className="blockquote text-start p-5 my-5">
                  <p>
                    Một khám phá vĩ đại giải quyết một vấn đề lớn nhưng có một
                    hạt nhân khám phá trong giải pháp của bất kỳ vấn đề nào. Vấn
                    đề của bạn có thể khiêm tốn; nhưng nếu nó thách thức sự tò
                    mò của bạn và phát huy khả năng sáng tạo của bạn, và nếu bạn
                    tự mình giải quyết nó, bạn có thể trải nghiệm sự căng thẳng
                    và tận hưởng niềm vui chiến thắng của sự khám phá.
                  </p>
                  <cite className="fs-5 fw-semibold mt-3 text-dark d-block">
                    – George Polya
                  </cite>
                </blockquote>
                <p>
                  Việc áp dụng các kỹ thuật thư giãn như thiền, hít thở sâu,
                  hoặc yoga có thể mang lại những lợi ích đáng kể. Dành ra vài
                  phút mỗi ngày để thực hành những bài tập này sẽ giúp bạn giảm
                  bớt căng thẳng, cải thiện sự tập trung và tăng cường sức khỏe
                  tổng thể. Đừng ngần ngại tìm kiếm sự giúp đỡ từ các chuyên gia
                  tâm lý nếu bạn cảm thấy quá tải. Chăm sóc sức khỏe tinh thần
                  cũng quan trọng như chăm sóc sức khỏe thể chất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSinglePage;
