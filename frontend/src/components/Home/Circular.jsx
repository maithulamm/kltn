import React, { useState, useEffect, Fragment } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { device } from "./Home";
import { useNavigate } from "react-router-dom";
import { getAllPlace, showLoadingScreen } from "../../redux/apiRequest";
const data_test = [
  {
    _id: "66641fab85f478ca5e546a46",
    intro: "Tượng đài Chủ tịch Tôn Đức Thắng",
    price: "Đang cập nhật",
    type: [
      {
        name: "Di tích lịch sử",
      },
      {
        name: "Tham quan",
      },
    ],
    phone: "",
    during: "120 phút",
    open: "7:00 SA",
    close: "6:00 CH",
    email: "unknow@gmail.com",
    address: "Phường Mỹ Long, Thành phố Long Xuyên, Tỉnh An Giang",
    info: "Bác xuất thân từ gia đình có truyền thống yêu nước tại cù lao ông Hổ, xã Mỹ Hòa Hưng, tổng Định Thành, tỉnh Long Xuyên nay thuộc thành phố Long Xuyên, tỉnh An Giang.\nMột miền quê giàu truyền thống cách mạng. Sau khi kế nhiệm Chủ tịch Hồ Chí Minh, ông trở thành Chủ tịch nước thứ 2 và cũng là Chủ tịch nước cuối cùng của Việt Nam dân chủ cộng hòa, đồng thời là Chủ tịch nước đầu tiên của nước Cộng hòa xã hội chủ nghĩa Việt Nam.",
    lat: "10.382410821480029",
    long: "105.44147292424437",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/quantrivien.vnptagg/images/places/tuong_dai_bac_ton/tuong_dai_bac_ton_144768772_999900910.jpg",
  },
  {
    _id: "66641fab85f478ca5e546a49",
    intro: "Làng nghề Dệt Chiếu Uzu",
    price: "Đang cập nhật",
    type: [
      {
        name: "Văn hóa",
      },
      {
        name: "Làng nghề",
      },
    ],
    phone: "",
    during: "120 phút",
    open: "7:00 SA",
    close: "6:00 CH",
    email: "langnghedetchieuuzu@gmail.com",
    address: "Xã Long An, Thị xã Tân Châu, Tỉnh An Giang",
    info: "Làng nghề Dệt Chiếu Uzu",
    lat: "10.802921",
    long: "105.216786",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/admin.tanchau/diem_du_lich/lang_nghe_det_chieu_uzu/a7b9959c0957f409ad46_504978582.jpg",
  },
  {
    _id: "66641fab85f478ca5e546a4a",
    intro: "Thiền Viện Trúc Lâm An Giang",
    price: "Đang cập nhật",
    type: [
      {
        name: "Tôn giáo",
      },
      {
        name: "Tham quan",
      },
    ],
    phone: "",
    during: "120 phút",
    open: "7:00 SA",
    close: "5:00 CH",
    email: "thoaison@gmail.com",
    address: "Nam Sơn  Thị trấn Núi Sập, Huyện Thoại Sơn, Tỉnh An Giang",
    info: "Thiền Viện Trúc Lâm An Giang",
    lat: "10.254174",
    long: "105.271065",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/admin.thoaison/tt_nui_sap/bcbc2854841a7944200b_76248590.jpg",
  },
  {
    _id: "66641fab85f478ca5e546a4d",
    intro: "Điện Bồ Hong - Núi Cấm",
    price: "Đang cập nhật",
    type: [
      {
        name: "Tham quan",
      },
    ],
    phone: "",
    during: "120 phút",
    open: "7:00 SA",
    close: "6:00 CH",
    email: "khudulichnuicam@gmail.com",
    address: "Ấp Vồ Đầu  Xã An Hảo, Huyện Tịnh Biên, Tỉnh An Giang",
    info: "Điện Bồ Hong là nơi cao nhất trên đỉnh núi Cấm và trong dãy Thất Sơn. Lên đỉnh Bồ Hong nhìn về phía nam, cánh đồng Lê Trì, Ba Chúc (Tri Tôn, An Giang) tựa như một tấm lụa đa sắc màu. Trông về phía tây là một quần thể kiến trúc chùa chiền quanh hồ Thủy Liêm ẩn hiện trong mây ngàn lãng đãng.",
    lat: "10.500814190829256",
    long: "104.98265062188233",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/admin.tinhbien/dien_bo_hong/3_custom_637201771260672661.jpg",
  },
  {
    _id: "66641fab85f478ca5e546a4f",
    intro: "Đình Vĩnh Ngươn",
    price: "Đang cập nhật",
    type: [
      {
        name: "Di tích lịch sử",
      },
      {
        name: "Tôn giáo",
      },
    ],
    phone: "02963861666",
    during: "30 phút",
    open: "5:00 SA",
    close: "5:00 CH",
    email: "bqllkdtnuisam@gmail.com",
    address:
      "Đường Tuy Biên,  Phường Vĩnh Ngươn, Thành phố Châu Đốc, Tỉnh An Giang",
    info: "Đình Vĩnh Ngươn nằm ở vị trí rất đẹp, bên vàm kênh Vĩnh Tế giáp với sông Hậu thành một ngã ba mênh mong sóng nước. Đầu tiên đình được xây dựng ở phía trong, vách ván lợp lá. Đến năm 1929, Đốc phủ Trương Tấn Vị cho dời về vị trí hiện nay và xây mới, tường gạch lợp ngói đỏ, nóc ba tầng, hai gian ba chái với diện tích hơn 520 mét vuông. Năm 1992, Ban quản trị đình cho tu sửa chính điện và xây cổng tam quan. Năm 1996 thay ngói âm dương toàn bộ mái đình. Năm 1998 thay nền gạch bằng gạch men. Năm 2002 do nâng cao và mở lộ nên di dời vào trong và xây lại cổng. Đình Vĩnh Ngươn được xếp hạng di tích kiến trúc nghệ thuật cấp quốc gia vào năm 2011.",
    lat: "10.719966",
    long: "105.113213",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/admin.chaudoc/ban_quan_ly_khu_di_tich_van_hoa_lich_su_va_du_lich_nui_sam/dinh_vinh_nguon/800px_mat_tien_dinh_vinh_nguon_637091051600550535.jpg",
  },
  {
    _id: "66641fab85f478ca5e546a55",
    intro: "Điểm du lịch Đồi Tức Dụp",
    price: "Đang cập nhật",
    type: [
      {
        name: "Tham quan",
      },
      {
        name: "Khu vui chơi",
      },
      {
        name: "Di tích lịch sử",
      },
    ],
    phone: "",
    during: "120 phút",
    open: "7:00 SA",
    close: "5:00 CH",
    email: "doitucdup@gmail.com",
    address: "Xã An Tức, Huyện Tri Tôn, Tỉnh An Giang",
    info: "Từ năm 1996 đến nay, Khu Di tích lịch sử cách mạng Đồi Tức Dụp gắn liền với tên gọi: Khu du lịch Đồi Tức Dụp thuộc địa phận xã An Tức, huyện Tri Tôn, tỉnh An Giang là điểm đến được nhiều du khách yêu thích. Đến đây, du khách được hòa mình vào khung cảnh tuy hoang sơ nhưng tuyệt mỹ. Trải nghiệm tận mắt thấy tai nghe những câu chuyện huyền thoại, lịch sử hào hùng…chiêm ngưỡng bảo tàng quân khí đa dạng nhất tại khu vực biên giới Tây Nam. Ngoài ra còn được tận hưởng không khí trong lành mát mẻ hữu tình và có những giây phút thư giản thú vị với nhiều trò chơi hấp dẫn.\nBảng chào Khu du lịch Đồi Tức Dụp\nĐường đi vào khu du lịch\nTức Dụp là một ngọn đồi nằm bên núi Cô Tô, cách thành phố Long Xuyên khoảng 70 km và cách biên giới campuchia 10km. Ngọn núi thuộc dãy Thất sơn hùng vĩ giữa bao la ruộng đồng của huyện Tri Tôn. Nhìn từ xa, ngọn núi như con chim phượng hoàng khổng lồ đang sải cánh giữa đồng bằng mênh mông, bởi vậy núi Cô ",
    lat: "10.377373",
    long: "104.956253",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/admin.triton/nhahangtucrup_637196253939702203.jpg",
    updatedAt: "2024-06-09T17:48:17.665Z",
  },
  {
    _id: "66641fab85f478ca5e546a57",
    intro: "Miếu Bà Chúa Xứ Tây Phú",
    price: "Đang cập nhật",
    type: [
      {
        name: "Tham quan",
      },
      {
        name: "Tôn giáo",
      },
    ],
    phone: "Đang cập nhật",
    during: "Không giới hạn",
    open: "7:00 SA",
    close: "6:00 CH",
    email: "mieubachuaxutayphu@gmail.com",
    address: "Xã Tây Phú, Huyện Thoại Sơn, Tỉnh An Giang",
    info: "Miếu Bà Chúa Xứ Tây Phú là nơi ghi dấu ấn cho tín ngưỡng thờ Mẫu của cư dân vùng đất nam bộ và là chứng tích lịch sử cách mạng ghi đậm những chiến công của Đảng bộ và nhân dân địa phương qua suốt 2 cuộc kháng chiến giành độc lập, thống nhất đất nước. Miếu Bà Chúa Xứ Tây Phú từng là nơi để thông tin liên lạc, tiếp tế lương thực và dừng chân của lực lượng cách mạng địa phương. Với những giá trị ấy, ngày 06/06/2023 Chủ tịch UBND tỉnh An Giang ra Quyết định số 815/QĐ-UBND công nhận Miếu Bà Chúa Xứ Tây Phú là di tích lịch sử cấp tỉnh. Đây là niềm vui, niềm vinh dự và tự hào của Cán bộ và nhân dân xã Tây Phú nói riêng và nhân dân huyện Thoại Sơn nói chung.",
    lat: "10.342449626461331",
    long: "105.13711344571522",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/quantrivien.vnptagg/images/places/mieu_ba_chua_xu_tay_phu/mieubachuaxutayphu_269731866.jpg",
    updatedAt: "2024-06-08T19:07:29.030Z",
  },
  {
    _id: "66641fab85f478ca5e546a59",
    intro: "Búng Bình Thiên",
    price: "Đang cập nhật",
    type: [
      {
        name: "Nghỉ dưỡng",
      },
      {
        name: "Tham quan",
      },
    ],
    phone: "Đang cập nhật",
    during: "120 phút",
    open: "6:00 SA",
    close: "6:00 CH",
    email: "dnbunbinhthien@gmail.com",
    address: "Xã Quốc Thái, Huyện An Phú, Tỉnh An Giang",
    info: "Búng Bình Thiên còn có tên là hồ Nước Trời, đây là hồ nước ngọt lớn nhất miền Tây Nam Bộ, tọa lạc tại phía Bắc huyện An Phú, tỉnh An Giang, nằm giáp ranh với các xã Nhơn Hội, Khánh An, Quốc Thái, Khánh Bình. Búng Bình Thiên bao gồm 2 hồ nước là Búng Lớn và Búng Nhỏ, do hồ Búng Nhỏ có ít nước nên khi nhắc đến Bùng Bình Thiên thì thường sẽ ám chỉ đến hồ Búng Lớn. Búng Lớn có diện tích mặt nước trung bình là 193ha, độ sâu trung bình là 6m; Búng Nhỏ thì có diện tích mặt nước trung bình là 10ha, độ sâu trung bình là 5m.",
    lat: "10.921199",
    long: "105.083426",
    imgURL:
      "https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/admin.anphu/bun_binh_thien/z1973705153701_917136d8048d0c70c01e22d9a343f81e_798086048.jpg",
    updatedAt: "2024-06-09T14:25:35.193Z",
  },
];
export default function Circular() {
  const place = data_test;
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState(null);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const navigate = useNavigate();
  const disaptch = useDispatch();

  useEffect(() => {
    getAllPlace("", disaptch);
    place
      ?.filter((item, index) => index < 6)
      .map((product) =>
        setProducts((prevProducts) => [...prevProducts, product])
      );
  }, []);
  const [visiblePlace, setVisiblePlace] = useState(false);
  const productTemplate = (product) => {
    return (
      <Fragment>
        <div
          className="border-1 surface-border m-2 text-center cursor-pointer hover:bg-primary-300 hover:text-50"
          onClick={() => {
            setCurrentProducts(product);
            setVisiblePlace(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={product.imgURL}
            alt={product.intro}
            className="mb-3"
            imageClassName="w-12 h-10rem "
          />
          <div className=" flex flex-wrap justify-content-center">
            <h4
              className="m-0 col-12"
              style={{
                whiteSpace: "nowrap",
                width: "15rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product?.intro}
            </h4>
            <p
              className="mt-0 mb-1 col-12"
              style={{
                whiteSpace: "nowrap",
                width: "15rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.address}
            </p>
            {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
          </div>
        </div>
      </Fragment>
    );
  };
  const cir = () => {
    return (
      <div className="w-12 flex justify-content-center">
        <div className="col-12 md:col-10 flex-column justify-content-center">
          <div className="flex justify-content-between w-full">
            <Button
              label="Địa điểm du lịch"
              icon="pi pi-map-marker"
              text
              className="p-button-outlined p-button-success"
              onClick={null}
            />
            <Button
              label="Xem thêm"
              //   icon="pi pi-plus"
              text
              className="p-button-outlined p-button-success my-2"
              onClick={() => {
                showLoadingScreen();
                navigate("/kltn/place");
              }}
            />
          </div>
          <Carousel
            value={products}
            numVisible={5}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={productTemplate}
            showIndicators={false}
          />
          <Dialog
            // maximizable
            visible={visiblePlace}
            style={{ width: device() ? "50vw" : "100vw" }}
            onHide={() => {
              if (!visiblePlace) return;
              setVisiblePlace(false);
            }}
            header={
              <img
                src={currentProducts?.imgURL}
                alt={currentProducts?.intro}
                style={{
                  objectFit: "cover",
                  width: "50%",
                  height: "15rem",
                  objectPosition: "center",
                  paddingLeft: "2rem",
                }}
              />
            }
            className="p-fluid"
            headerClassName="text-center w-full flex justify-content-center mb-0"
            draggable={false}
          >
            <h2 className="text-center">{currentProducts?.intro}</h2>
            <div className="field col-12 flex align-items-center m-0 p-0">
              <span
                className={"pi pi-map-marker col-1 m-0"}
                style={{ color: "var(--primary-color)" }}
              ></span>
              <span className="col-11 m-0 p-0">{currentProducts?.address}</span>
            </div>
            <div className="field col-12 flex align-items-center m-0 p-0">
              <span
                className={"pi pi-phone col-1"}
                style={{ color: "var(--primary-color)" }}
              ></span>
              <div className=" col-11 m-0 p-0">
                {currentProducts?.phone || "Đang cập nhật"}
              </div>
            </div>
            <div className="field col-12 flex align-items-center m-0 p-0">
              <span
                className={"pi pi-envelope col-1"}
                style={{ color: "var(--primary-color)" }}
              ></span>
              <div className="col-11 m-0 p-0">
                {currentProducts?.email || "Đang cập nhật"}
              </div>
            </div>
            <div className="field col-12 flex align-items-center m-0 p-0">
              <span
                className={"pi pi-clock col-1"}
                style={{ color: "var(--primary-color)" }}
              ></span>
              <div className=" col-11 m-0 p-0">
                {currentProducts?.open}
                {" - "}
                {currentProducts?.close}
              </div>
            </div>
            <div className="field col-12 flex align-items-center m-0 p-0">
              <span
                className={"pi pi-money-bill col-1"}
                style={{ color: "var(--primary-color)" }}
              ></span>
              <div className=" col-11 m-0 p-0">
                {currentProducts?.price || "Đang cập nhật"}
              </div>
            </div>
            <div className="field col-12 flex align-items-center m-0 p-0">
              <div
                className=" col-12 m-0 p-3"
                style={{
                  textIndent: "3rem",
                  textAlign: "justify",
                }}
              >
                {currentProducts?.info || "Đang cập nhật"}
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  };
  return cir();
}
