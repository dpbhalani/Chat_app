import React, { useEffect, useState } from "react";
// import axios from "axios";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const data = await fetch("http://localhost:8000/api/chats");
    const jsondata = await data.json();
    setChats(jsondata);
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
