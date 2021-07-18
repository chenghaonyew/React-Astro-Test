import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannels,
  selectSavedChannel,
} from "../features/channel/channelSlice";
import db from "../firebase";
import RemoveIcon from "@material-ui/icons/Remove";
import "./SavedChannel.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function SavedChannel() {
  const dispatch = useDispatch();
  let saveds = [];

  useEffect(() => {
    db.collection("channel").onSnapshot((snapshot) => {
      saveds = [];
      snapshot.docs.map((doc) => {
        switch (doc.data().type) {
          // if the type of data matched the category below, expand whatever it was and then add the new record
          case "saved":
            saveds = [...saveds, { id: doc.id, ...doc.data() }];
            console.log(saveds);
            break;
          default:
        }
      });

      dispatch(
        setChannels({
          savedChannel: saveds,
        })
      );
    });
  }, []);

  const savedChannels = useSelector(selectSavedChannel);

  const handleDel = (e, id) => {
    e.stopPropagation();
    db.collection("channel").doc(id).delete();
  };

  return (
    <div className="savedChannel">
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      <div className="savedChannel_title">
        <h1>Saved Channel</h1>
      </div>
      <div className="savedChannel_content">
        {savedChannels &&
          savedChannels.map((channel) => {
            return (
              <div key={channel.id} className="savedChannel_wrap">
                <Link to={"/detail/" + channel.channelID}>
                  <img src={channel.image} alt={channel.title} />
                </Link>

                <div className="savedChannel_description">
                  <p>{channel.title}</p>
                  <RemoveIcon onClick={(e) => handleDel(e, channel.id)} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SavedChannel;
