import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import SortFilter from "./SortFilter";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";

function Home() {
  const [channels, setChannels] = useState([]);
  const [defaultChannels, setDefaultChannels] = useState([]);
  const [filteredChannel, setFilteredhannel] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [numActive, setNumActive] = useState(true);
  const [channelNameActive, setChannelNameActive] = useState(false);

  const [allCatActive, setAllCatActive] = useState(true);
  const [varietyEnterActive, setVarietyEnterActive] = useState(false);
  const [specialIntActive, setSpecialIntActive] = useState(false);
  const [moviesActive, setMoviesActive] = useState(false);
  const [musicActive, setMusicActive] = useState(false);
  const [kidsActive, setKidsActive] = useState(false);
  const [newsActive, setNewsActive] = useState(false);
  const [lifestyleActive, setLifestyleActive] = useState(false);
  const [learningActive, setLearningActive] = useState(false);
  const [sportsActive, setSportsActive] = useState(false);
  const [radioActive, setRadioActive] = useState(false);

  const [allLagActive, setAllLagActive] = useState(true);
  const [MulLangActive, setMulLangActive] = useState(false);
  const [korJapActive, setKorJapActive] = useState(false);
  const [intActive, setIntActive] = useState(false);
  const [chiActive, setChiActive] = useState(false);
  const [indActive, setIndActive] = useState(false);
  const [malayActive, setMalayActive] = useState(false);

  const [allHDActive, setAllHDActive] = useState(true);
  const [isHDActive, setIsHDActive] = useState(false);
  const [noHDActive, setNoHDActive] = useState(false);

  const [channelCounter, setChannelCounter] = useState(0);

  useEffect(() => {
    fetch("https://contenthub-api.eco.astro.com.my/channel/all.json", {
      method: "GET",
    })
      .then((results) => results.json())
      .then((data) => {
        console.log(data.response);
        setDefaultChannels(data.response);
        setFilteredhannel(data.response);
        setChannels(data.response);
      });
    db.collection("channel")
      .get()
      .then((snap) => {
        setChannelCounter(snap.size); // will return the collection size
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    var searchedChannelName = defaultChannels.filter((v) =>
      v.title.toLowerCase().includes(searchInput)
    );

    var searchedChannelNumber = defaultChannels.filter((v) =>
      v.stbNumber.includes(searchInput)
    );

    var searchedChannel = [...searchedChannelName, ...searchedChannelNumber];

    const mergedSearchedChannel =
      // store the comparison values in array
      searchedChannel
        .map((e) => e["id"])

        // store the indexes of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the false indexes & return unique objects
        .filter((e) => searchedChannel[e])
        .map((e) => searchedChannel[e]);

    setChannels(mergedSearchedChannel);
  };

  const handleDefault = () => {
    setSearchInput("");
    setChannels(defaultChannels);
  };

  const sortByChannelNumber = () => {
    var sortedChannel = channels.sort(function (a, b) {
      return a.stbNumber > b.stbNumber ? 1 : -1;
    });
    setChannels(sortedChannel);
    setNumActive(true);
    setChannelNameActive(false);
  };

  const sortByChannelName = () => {
    var sortedChannel = channels.sort(function (a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    setChannels(sortedChannel);
    setNumActive(false);
    setChannelNameActive(true);
  };

  const filterByCategory = (category) => {
    setFilteredhannel(defaultChannels);
    setAllLagActive(true);
    setMulLangActive(false);
    setKorJapActive(false);
    setIntActive(false);
    setChiActive(false);
    setIndActive(false);
    setMalayActive(false);
    setNumActive(true);
    setChannelNameActive(false);
    setAllHDActive(true);
    setIsHDActive(false);
    setNoHDActive(false);
    switch (category) {
      case "Variety Entertainment":
        setChannels(
          filteredChannel.filter(
            (channel) => channel.category === "Variety Entertainment"
          )
        );
        setAllCatActive(false);
        setVarietyEnterActive(true);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "Special Interest":
        setChannels(
          filteredChannel.filter(
            (channel) => channel.category === "Special Interest"
          )
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(true);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "Movies":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "Movies")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(true);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "Music":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "Music")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(true);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "Kids":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "Kids")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(true);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "News":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "News")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(true);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "Lifestyle":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "Lifestyle")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(true);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "Learning":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "Learning")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(true);
        setSportsActive(false);
        setRadioActive(false);
        break;
      case "Sports":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "Sports")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(true);
        setRadioActive(false);
        break;
      case "Radio":
        setChannels(
          filteredChannel.filter((channel) => channel.category === "Radio")
        );
        setAllCatActive(false);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(true);
        break;
      default:
        setChannels(defaultChannels);
        setAllCatActive(true);
        setVarietyEnterActive(false);
        setSpecialIntActive(false);
        setMoviesActive(false);
        setMusicActive(false);
        setKidsActive(false);
        setNewsActive(false);
        setLifestyleActive(false);
        setLearningActive(false);
        setSportsActive(false);
        setRadioActive(false);
    }
  };

  const filterByLanguage = (language) => {
    setFilteredhannel(defaultChannels);
    setAllCatActive(true);
    setVarietyEnterActive(false);
    setSpecialIntActive(false);
    setMoviesActive(false);
    setMusicActive(false);
    setKidsActive(false);
    setNewsActive(false);
    setLifestyleActive(false);
    setLearningActive(false);
    setSportsActive(false);
    setRadioActive(false);
    setNumActive(true);
    setChannelNameActive(false);
    setAllHDActive(true);
    setIsHDActive(false);
    setNoHDActive(false);
    switch (language) {
      case "Multiple Language":
        setChannels(
          filteredChannel.filter(
            (channel) => channel.language === "Multiple Language"
          )
        );
        setAllLagActive(false);
        setMulLangActive(true);
        setKorJapActive(false);
        setIntActive(false);
        setChiActive(false);
        setIndActive(false);
        setMalayActive(false);
        break;
      case "Korean & Japanese":
        setChannels(
          filteredChannel.filter(
            (channel) => channel.language === "Korean & Japanese"
          )
        );
        setAllLagActive(false);
        setMulLangActive(false);
        setKorJapActive(true);
        setIntActive(false);
        setChiActive(false);
        setIndActive(false);
        setMalayActive(false);
        break;
      case "International":
        setChannels(
          filteredChannel.filter(
            (channel) => channel.language === "International"
          )
        );
        setAllLagActive(false);
        setMulLangActive(false);
        setKorJapActive(false);
        setIntActive(true);
        setChiActive(false);
        setIndActive(false);
        setMalayActive(false);
        break;
      case "Chinese":
        setChannels(
          filteredChannel.filter((channel) => channel.language === "Chinese")
        );
        setAllLagActive(false);
        setMulLangActive(false);
        setKorJapActive(false);
        setIntActive(false);
        setChiActive(true);
        setIndActive(false);
        setMalayActive(false);
        break;
      case "Indian":
        setChannels(
          filteredChannel.filter((channel) => channel.language === "Indian")
        );
        setAllLagActive(false);
        setMulLangActive(false);
        setKorJapActive(false);
        setIntActive(false);
        setChiActive(false);
        setIndActive(true);
        setMalayActive(false);
        break;
      case "Malay":
        setChannels(
          filteredChannel.filter((channel) => channel.language === "Malay")
        );
        setAllLagActive(false);
        setMulLangActive(false);
        setKorJapActive(false);
        setIntActive(false);
        setChiActive(false);
        setIndActive(false);
        setMalayActive(true);
        break;
      default:
        setChannels(defaultChannels);
        setAllLagActive(true);
        setMulLangActive(false);
        setKorJapActive(false);
        setIntActive(false);
        setChiActive(false);
        setIndActive(false);
        setMalayActive(false);
    }
  };

  const filterByResolution = (resolution) => {
    setFilteredhannel(defaultChannels);
    setAllCatActive(true);
    setVarietyEnterActive(false);
    setSpecialIntActive(false);
    setMoviesActive(false);
    setMusicActive(false);
    setKidsActive(false);
    setNewsActive(false);
    setLifestyleActive(false);
    setLearningActive(false);
    setSportsActive(false);
    setRadioActive(false);
    setNumActive(true);
    setChannelNameActive(false);
    setAllLagActive(true);
    setMulLangActive(false);
    setKorJapActive(false);
    setIntActive(false);
    setChiActive(false);
    setIndActive(false);
    setMalayActive(false);
    setNumActive(true);
    setChannelNameActive(false);
    switch (resolution) {
      case "HD":
        setChannels(filteredChannel.filter((channel) => channel.isHd));
        setAllHDActive(false);
        setIsHDActive(true);
        setNoHDActive(false);
        break;
      case "NHD":
        setChannels(filteredChannel.filter((channel) => !channel.isHd));
        setAllHDActive(false);
        setIsHDActive(false);
        setNoHDActive(true);
        break;
      default:
        setChannels(defaultChannels);
        setAllHDActive(true);
        setIsHDActive(false);
        setNoHDActive(false);
    }
  };

  const handleAdd = (e, channelID, channelImage, channelTitle) => {
    // Dont want the website refresh when submit
    e.preventDefault();

    //handleCheck(channelID);
    // Add user new post into firebase database
    db.collection("channel").doc(channelID.toString()).set({
      image: channelImage,
      title: channelTitle,
      type: "saved",
    });

    db.collection("channel")
      .get()
      .then((snap) => {
        setChannelCounter(snap.size); // will return the collection size
      });
  };

  return (
    <div className="home">
      <div className="home_searchbar">
        <form>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search Channels Name, Channels Number"
          />
          <button type="button" onClick={handleDefault}>
            Clear
          </button>
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <div className="home_sort">
        <a href="/savedChannel">Saved Channels ({channelCounter})</a>
      </div>
      <div className="home_sort">
        <span>Sort By: </span>
        <SortFilter
          cssClass={numActive ? "home_sortActive" : ""}
          sortBy={sortByChannelNumber}
          title="Channel Number"
        />
        <SortFilter
          cssClass={channelNameActive ? "home_sortActive" : ""}
          sortBy={sortByChannelName}
          title="Channel Name"
        />
      </div>
      <div className="home_sort">
        <span>Category: </span>
        <SortFilter
          cssClass={allCatActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("All")}
          title="All"
        />
        <SortFilter
          cssClass={varietyEnterActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Variety Entertainment")}
          title="Variety Entertainment"
        />
        <SortFilter
          cssClass={specialIntActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Special Interest")}
          title="Special Interest"
        />
        <SortFilter
          cssClass={moviesActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Movies")}
          title="Movies"
        />
        <SortFilter
          cssClass={musicActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Music")}
          title="Music"
        />
        <SortFilter
          cssClass={kidsActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Kids")}
          title="Kids"
        />
        <SortFilter
          cssClass={newsActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("News")}
          title="News"
        />
        <SortFilter
          cssClass={lifestyleActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Lifestyle")}
          title="Lifestyle"
        />
        <SortFilter
          cssClass={learningActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Learning")}
          title="Learning"
        />
        <SortFilter
          cssClass={sportsActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Sports")}
          title="Sports"
        />
        <SortFilter
          cssClass={radioActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("Radio")}
          title="Radio"
        />
      </div>
      <div className="home_sort">
        <span>Language: </span>
        <SortFilter
          cssClass={allLagActive ? "home_sortActive" : ""}
          sortBy={() => filterByCategory("All")}
          title="All"
        />
        <SortFilter
          cssClass={MulLangActive ? "home_sortActive" : ""}
          sortBy={() => filterByLanguage("Multiple Language")}
          title="Multiple Language"
        />
        <SortFilter
          cssClass={korJapActive ? "home_sortActive" : ""}
          sortBy={() => filterByLanguage("Korean & Japanese")}
          title="Korean/Japanese"
        />
        <SortFilter
          cssClass={intActive ? "home_sortActive" : ""}
          sortBy={() => filterByLanguage("International")}
          title="International"
        />
        <SortFilter
          cssClass={chiActive ? "home_sortActive" : ""}
          sortBy={() => filterByLanguage("Chinese")}
          title="Chinese"
        />
        <SortFilter
          cssClass={indActive ? "home_sortActive" : ""}
          sortBy={() => filterByLanguage("Indian")}
          title="Indian"
        />
        <SortFilter
          cssClass={malayActive ? "home_sortActive" : ""}
          sortBy={() => filterByLanguage("Malay")}
          title="Malay"
        />
      </div>
      <div className="home_sort">
        <span>Resolution : </span>
        <SortFilter
          cssClass={allHDActive ? "home_sortActive" : ""}
          sortBy={() => filterByResolution("All")}
          title="All"
        />
        <SortFilter
          cssClass={isHDActive ? "home_sortActive" : ""}
          sortBy={() => filterByResolution("HD")}
          title="HD"
        />
        <SortFilter
          cssClass={noHDActive ? "home_sortActive" : ""}
          sortBy={() => filterByResolution("NHD")}
          title="Non HD"
        />
      </div>
      <div className="home_content">
        {channels.map((channel) => (
          <div key={channel.id} className="home_wrap">
            <Link to={"/detail/" + channel.id}>
              <img
                src={
                  channel.originalImage
                    ? channel.originalImage
                    : channel.backupImage
                }
                alt={channel.title}
              />
            </Link>
            <div className="home_description">
              <p>{channel.title}</p>
              <AddIcon
                onClick={(e) =>
                  handleAdd(e, channel.id, channel.originalImage, channel.title)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
