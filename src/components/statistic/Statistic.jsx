
import './style.css';
import item1 from '../../assets/images/item1.svg';
import item2 from '../../assets/images/item2.svg';
import item3 from '../../assets/images/item3.svg';

export const Statistic = () => {
    const content = [
        ["Số lượng địa điểm du lịch", item1, "Tổng số địa điểm trên bản đồ", "100", "Số địa điểm đã kiểm duyệt", "50", "Số địa điểm chờ chỉnh sửa", "100"],
        ["Số lượng tài khoản người dùng đăng ký", item2, "Tổng số tài khoản", "100", "Số tài khoản đã xác thực", "50", "Số tài khoản chờ xác thực", "100"],
        ["Số lượng góp ý và đề xuất từ người dùng", item3, "Tổng số góp ý", "100", "Đã trả lời", "50", "Chưa trả lời", "100"]
    ];



    return (
        <section className="Statistic">
            <label>
                <input type="checkbox" name="box" id='box1'/>
                <h2 className="Statistic__title">Thống kê sơ bộ </h2>
            </label>
            <div className="Statistic__content">
                {
                    content.map((item, index) => {
                        return (
                            <div className="Statistic__item">
                            <p className='Item_name'> {item[0]}</p>
                            <img src={item[1]} alt="" />
                            <div className='Item__detail'>
                                <div className='Item__detail1'>
                                    <p className='pA' >{item[2]}</p>
                                    <p className='pB'>{item[3]}</p>
                                </div>
                                <div className='Item__detail2'>
                                    <p className='pA' >{item[4]}</p>
                                    <p className='pB'>{item[5]}</p>
                                </div>
                                <div className='Item__detail3'>
                                    <p className='pA' >{item[6]}</p>
                                    <p className='pB'>{item[7]}</p>
                                </div>
                            </div>
                        </div>
                        );
                    })
                }
            </div>
        </section>
    );
};