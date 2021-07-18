import React, { useState, useEffect } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { add, format, getDay } from "date-fns";

function Detail() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [monActive, setMonActive] = useState(false);
  const [tueActive, setTueActive] = useState(false);
  const [wedActive, setWedActive] = useState(false);
  const [thuActive, setThuActive] = useState(false);
  const [friActive, setFriActive] = useState(false);
  const [satActive, setSatActive] = useState(false);
  const [sunActive, setSunActive] = useState(false);
  const [monSchedule, setMonSchedule] = useState([]);
  const [tueSchedule, setTueSchedule] = useState([]);
  const [wedSchedule, setWedSchedule] = useState([]);
  const [thuSchedule, setThuSchedule] = useState([]);
  const [friSchedule, setFriSchedule] = useState([]);
  const [satSchedule, setSatSchedule] = useState([]);
  const [sunSchedule, setSunSchedule] = useState([]);

  useEffect(() => {
    fetch(`https://contenthub-api.eco.astro.com.my/channel/${id}.json`, {
      method: "GET",
    })
      .then((results) => results.json())
      .then((data) => {
        setDetails(data.response);

        // get day of week and distribute today schedule
        var today = format(new Date(), "yyyy-MM-dd");
        console.log(data.response.schedule);
        var result = getDay(new Date(today));
        switch (result) {
          case 1:
            setMonActive(true);
            setMonSchedule(data.response.schedule[today]);
            break;
          case 2:
            setTueActive(true);
            setTueSchedule(data.response.schedule[today]);
            break;
          case 3:
            setWedActive(true);
            setWedSchedule(data.response.schedule[today]);
            break;
          case 4:
            setThuActive(true);
            setThuSchedule(data.response.schedule[today]);
            break;
          case 5:
            setFriActive(true);
            setFriSchedule(data.response.schedule[today]);
            break;
          case 6:
            setSatActive(true);
            setSatSchedule(data.response.schedule[today]);
            break;
          case 7:
            setSunActive(true);
            setSunSchedule(data.response.schedule[today]);
            break;
          default:
        }

        // get other dayof Week & distribute data
        for (let i = 1; i < 7; i++) {
          var addDay = format(add(new Date(today), { days: i }), "yyyy-MM-dd");
          var addDayResult = getDay(new Date(addDay));
          switch (addDayResult) {
            case 1:
              console.log("monday add");
              setMonSchedule(data.response.schedule[addDay]);
              break;
            case 2:
              console.log("tuesday add");
              setTueSchedule(data.response.schedule[addDay]);
              break;
            case 3:
              console.log("wednesday add");
              setWedSchedule(data.response.schedule[addDay]);
              break;
            case 4:
              console.log("thurday add");
              setThuSchedule(data.response.schedule[addDay]);
              break;
            case 5:
              console.log("friday add");
              setFriSchedule(data.response.schedule[addDay]);
              break;
            case 6:
              console.log("satday add");
              setSatSchedule(data.response.schedule[addDay]);
              break;
            case 0:
              console.log("sunday add");
              setSunSchedule(data.response.schedule[addDay]);
              break;
            default:
          }
        }
      });
  }, []);

  const getScheduleDetail = () => {};

  const handleToggle = (date) => {
    switch (date) {
      case "MON":
        setMonActive(true);
        setTueActive(false);
        setWedActive(false);
        setThuActive(false);
        setFriActive(false);
        setSatActive(false);
        setSunActive(false);
        break;
      case "TUE":
        setMonActive(false);
        setTueActive(true);
        setWedActive(false);
        setThuActive(false);
        setFriActive(false);
        setSatActive(false);
        setSunActive(false);
        break;
      case "WED":
        setMonActive(false);
        setTueActive(false);
        setWedActive(true);
        setThuActive(false);
        setFriActive(false);
        setSatActive(false);
        setSunActive(false);
        break;
      case "THU":
        setMonActive(false);
        setTueActive(false);
        setWedActive(false);
        setThuActive(true);
        setFriActive(false);
        setSatActive(false);
        setSunActive(false);
        break;
      case "FRI":
        setMonActive(false);
        setTueActive(false);
        setWedActive(false);
        setThuActive(false);
        setFriActive(true);
        setSatActive(false);
        setSunActive(false);
        break;
      case "SAT":
        setMonActive(false);
        setTueActive(false);
        setWedActive(false);
        setThuActive(false);
        setFriActive(false);
        setSatActive(true);
        setSunActive(false);
        break;
      case "SUN":
        setMonActive(false);
        setTueActive(false);
        setWedActive(false);
        setThuActive(false);
        setFriActive(false);
        setSatActive(false);
        setSunActive(true);
        break;
      default:
    }
  };

  return (
    <div className="detail">
      <div className="detail_back">
        <Link to="/">
          <ArrowBackIcon />
          <span>Home Page</span>
        </Link>
      </div>
      <div className="detail_desc">
        <div className="detail_descTop">
          <img src={details.originalImage} alt="" />
          <div className="detail_descTopRight">
            <span>CH {details.stbNumber}</span>
            <p>{details.title}</p>
          </div>
        </div>
        <div className="detail_descBottom">{details.description}</div>
      </div>
      <div className="detail_schedule">
        <div className="detail_scheduleTop">
          <button
            onClick={() => handleToggle("MON")}
            className={monActive ? "detail_schActive" : ""}
          >
            MON
          </button>
          <button
            onClick={() => handleToggle("TUE")}
            className={tueActive ? "detail_schActive" : ""}
          >
            TUE
          </button>
          <button
            onClick={() => handleToggle("WED")}
            className={wedActive ? "detail_schActive" : ""}
          >
            WED
          </button>
          <button
            onClick={() => handleToggle("THU")}
            className={thuActive ? "detail_schActive" : ""}
          >
            THU
          </button>
          <button
            onClick={() => handleToggle("FRI")}
            className={friActive ? "detail_schActive" : ""}
          >
            FRI
          </button>
          <button
            onClick={() => handleToggle("SAT")}
            className={satActive ? "detail_schActive" : ""}
          >
            SAT
          </button>
          <button
            onClick={() => handleToggle("SUN")}
            className={sunActive ? "detail_schActive" : ""}
          >
            SUN
          </button>
        </div>
        <div className="detail_scheduleBottom">
          {monActive &&
            monSchedule.map((sch) => (
              <div className="detail_scheduleDetail">
                <span className="">{sch.datetime.substring(11, 16)}</span>
                <span>{sch.title}</span>
              </div>
            ))}
          {tueActive &&
            tueSchedule.map((sch) => (
              <div className="detail_scheduleDetail">
                <span className="">{sch.datetime.substring(11, 16)}</span>
                <span>{sch.title}</span>
              </div>
            ))}
          {wedActive &&
            wedSchedule.map((sch) => (
              <div className="detail_scheduleDetail">
                <span className="">{sch.datetime.substring(11, 16)}</span>
                <span>{sch.title}</span>
              </div>
            ))}
          {thuActive &&
            thuSchedule.map((sch) => (
              <div className="detail_scheduleDetail">
                <span className="">{sch.datetime.substring(11, 16)}</span>
                <span>{sch.title}</span>
              </div>
            ))}
          {friActive &&
            friSchedule.map((sch) => (
              <div className="detail_scheduleDetail">
                <span className="">{sch.datetime.substring(11, 16)}</span>
                <span>{sch.title}</span>
              </div>
            ))}
          {satActive &&
            satSchedule.map((sch) => (
              <div className="detail_scheduleDetail">
                <span className="">{sch.datetime.substring(11, 16)}</span>
                <span>{sch.title}</span>
              </div>
            ))}
          {sunActive &&
            sunSchedule.map((sch) => (
              <div className="detail_scheduleDetail">
                <span className="">{sch.datetime.substring(11, 16)}</span>
                <span>{sch.title}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;
