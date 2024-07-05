import React from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { HeaderUser } from "../../components/Header/HeaderUser";
import { Card } from "primereact/card";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

function FB() {
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  return (
    <div className="">
      <HeaderUser />
      <div className="flex justify-content-center flex-wrap col-12 ">
        <div className="col-12">
          <h2 className="text-center">Góp ý và đề xuất</h2>
        </div>
        <div className="col-12">
          <Card>
            <div className="flex justify-content-center flex-wrap col-12">
              <div className="col-12">
                <h3>Người gửi: {user.fullName || user.username}</h3>
                <p>
                  Chúng tôi rất mong nhận được ý kiến đóng góp của bạn và sẽ
                  phản hồi lại sớm nhất có thể.
                </p>
                <br />
                <FloatLabel className="w-full">
                  <InputText
                    id="username"
                    className="col-12 md:col-6"
                    // value={value}
                    // onChange={(e) => setValue(e.target.value)}
                  />
                  <label for="username">Tiêu đề</label>
                </FloatLabel>
                {/* <div className="card flex justify-content-center"> */}
                  <InputTextarea
                  className="col-12 md:col-6 mt-3"
                    keyfilter="int"
                    placeholder="Nhập nội dung góp ý của bạn vào đây..."
                    rows={5}
                    cols={'auto'}
                  />
                {/* </div> */}
                <div className="mt-3">
                  <Button label="Gửi" icon="pi pi-send" onClick={() => window.alert("Chức năng đang cập nhật")}/>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FB;
