import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/api/chats");
    setChats(data);
    //console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {chats.map((el) => (
        <div key={el._id} style={{ color: "white" }}>
          {el.chatName}
        </div>
      ))}
    </div>
  );
};

export default ChatsPage;
