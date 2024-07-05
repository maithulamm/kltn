import React, { Fragment } from "react";
import { Header } from "../../components/Header/Header";
import { Card } from "primereact/card";

function ChatbotPage() {
  return (
    <Fragment>
      <Header />
        <iframe
          src="https://www.coze.com/space/7387680244959887378/bot/7387681070575616016"
          width="100%"
          height="100%"
          style={{ border: "none", overflow: "hidden", height: "90vh"}}
        ></iframe>
    </Fragment>
  );
}

export default ChatbotPage;
