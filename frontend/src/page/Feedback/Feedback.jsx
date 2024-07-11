import React, { Fragment, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { HeaderUser } from "../../components/Header/HeaderUser";
import { Card } from "primereact/card";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import {
  addFeedback,
  getAllFeedback,
  hideLoadingScreen,
  loading,
  showLoadingScreen,
  updateFeedback,
} from "../../redux/apiRequest";
import { Dialog } from "primereact/dialog";

export const Feedback = () => {
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const accessToken = useSelector((state) => state?.auth?.login?.accessToken);
  const dispatch = useDispatch();
  const feedback = useSelector(
    (state) => state?.feedbacks?.feedback?.allFeedback
  )?.filter((item, index) => index < 100)
  ?.reverse() || [];
  
  const [title, setTitle] = useState("");
  const [report, setReport] = useState("");
  const newFeedback = {
    name: user?.fullName || user?.username,
    title: title,
    report: report,
    answer: "",
  };
  const sendFeedback = () => {
    return addFeedback(newFeedback, accessToken, dispatch);
  };

  useEffect(() => {
    getAllFeedback(accessToken, dispatch);
  }, [accessToken, dispatch]);
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
                <h3>Người gửi: {user?.fullName || user?.username}</h3>
                <p>
                  Chúng tôi rất mong nhận được ý kiến đóng góp của bạn và sẽ
                  phản hồi lại sớm nhất có thể.
                </p>
                <br />
                <FloatLabel className="w-full">
                  <InputText
                    id="username"
                    className="col-12 md:col-6"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="username">Tiêu đề</label>
                </FloatLabel>
                {/* <div className="card flex justify-content-center"> */}
                <InputTextarea
                  className="col-12 md:col-6 mt-3"
                  // keyfilter="int"
                  placeholder="Nhập nội dung góp ý của bạn vào đây..."
                  rows={5}
                  cols={"auto"}
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                />
                {/* </div> */}
                <div className="mt-3">
                  <Button
                    label="Gửi"
                    icon="pi pi-send"
                    onClick={() => {
                      sendFeedback();
                      showLoadingScreen();
                      setTimeout(() => {
                        getAllFeedback(accessToken, dispatch);
                        hideLoadingScreen();
                      }, 1500);
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex justify-content-center flex-wrap col-12 ">
        {feedback
        ?.map((item, index) => {
          return (
            <div
              className="flex justify-content-center flex-wrap col-12"
              key={index}
            >
              <Card className="m-0 p-0 w-full">
                <div className="flex justify-content-center flex-wrap col-12 p-0">
                  <div className="col-12 p-0">
                    <div className="flex justify-content-start w-full">
                      <p className="m-0 mr-3">
                        <strong>{item?.name}</strong>
                      </p>
                      <p className="m-0">
                        {new Date(item?.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <h4>{item?.title}</h4>
                    <p>{item?.report}</p>
                    <br />
                    <div className="flex justify-content-between flex-wrap col-12">
                      <FloatLabel className="col-10">
                        <InputText
                          id="username"
                          className="col-12 md:col-12"
                          value={
                            item?.answer ? item?.answer : "Chưa có phản hồi"
                          }
                          disabled
                        />
                        <label htmlFor="username">
                          Phản hồi{" "}
                          {item?.answer
                            ? "(" +
                              new Date(item?.updatedAt).toLocaleString() +
                              ")"
                            : null}
                        </label>
                      </FloatLabel>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      {loading()}
    </div>
  );
};

export const Feedback2 = () => {
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const accessToken = useSelector((state) => state?.auth?.login?.accessToken);
  const dispatch = useDispatch();
  const feedback = useSelector(
    (state) => state?.feedbacks?.feedback?.allFeedback
  )?.filter((item, index) => index < 100)
  ?.reverse() || [];
  const [cFeedback, setcFeedback] = useState({});
  const [answer, setAnswer] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const editFeedback = (cFeedback) => {
    return updateFeedback(cFeedback, accessToken, dispatch);
  };
  useEffect(() => {
    getAllFeedback(accessToken, dispatch);
    // console.log(cFeedback);
  }, [accessToken, dispatch]);
  return (
    <Fragment>
      <Header />
      <div className="flex justify-content-center flex-wrap col-12 ">
        {feedback?.map((item, index) => {
          return (
            <div
              className="flex justify-content-center flex-wrap col-12 md:col-6"
              key={index}
            >
              <div className="col-12">
                <Card>
                  <div className="flex justify-content-center flex-wrap col-12">
                    <div className="col-12">
                      <h3>{item?.name}</h3>
                      <p>{new Date(item?.createdAt).toLocaleString()}</p>

                      <h4>{item?.title}</h4>
                      <p>{item?.report}</p>
                      <br />
                      <div className="flex justify-content-between flex-wrap col-12">
                        <FloatLabel className="col-10">
                          <InputText
                            id="username"
                            className="col-12 md:col-12"
                            value={
                              item?.answer ? item?.answer : "Chưa có phản hồi"
                            }
                            disabled
                          />
                          <label htmlFor="username">
                            Phản hồi{" "}
                            {item?.answer
                              ? "(" +
                                new Date(item?.updatedAt).toLocaleString() +
                                ")"
                              : null}
                          </label>
                        </FloatLabel>
                        <br />
                        {item?.answer ? (
                          <Button
                            label=""
                            icon="pi pi-pencil"
                            onClick={() => {
                              setDialogVisible(true);
                              setcFeedback(item);
                              setAnswer(item?.answer);
                            }}
                          />
                        ) : (
                          <Button
                            label=""
                            icon="pi pi-send"
                            onClick={() => {
                              setDialogVisible(true);
                              setcFeedback(item);
                              setAnswer("");
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          );
        })}
        <Dialog
          header="Phản hồi"
          visible={dialogVisible}
          style={{ width: "50vw" }}
          onHide={() => setDialogVisible(false)}
        >
          <div className="flex justify-content-center flex-wrap col-12">
            <div className="col-12">
              <h3>{cFeedback?.name}</h3>
              <p>{new Date(cFeedback?.createdAt).toLocaleString()}</p>
              <h4>{cFeedback?.title}</h4>
              <p>{cFeedback?.report}</p>
              <br />
              <FloatLabel className="w-full">
                <InputTextarea
                  className="col-12 md:col-6 mt-3"
                  // keyfilter="int"
                  placeholder="Nhập nội dung góp ý của bạn vào đây..."
                  rows={5}
                  cols={"auto"}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </FloatLabel>
              <div className="mt-3">
                <Button
                  label="Gửi"
                  icon="pi pi-send"
                  onClick={() => {
                    editFeedback({ ...cFeedback, answer });
                    setDialogVisible(false);
                    showLoadingScreen();
                    setTimeout(() => {
                      getAllFeedback(accessToken, dispatch);
                      hideLoadingScreen();
                    }, 1500);
                  }}
                />
              </div>
            </div>
          </div>
        </Dialog>
        {loading()}
      </div>
    </Fragment>
  );
};
