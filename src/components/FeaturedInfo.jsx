import "./featuredInfo.css";
import {  ArrowUpward, PermIdentity } from "@material-ui/icons";
import { useEffect, useState } from "react";

const UserCount = () => {
  const [userCount, setUserCount] = useState(0);
  const [coproprietaireCount, setCoproprietaireCount] = useState(0);
  const [syndicCount, setSyndicCount] = useState(0);

  const fetchUserCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/total');
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCoproprietaireCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/coproprietaires/count');
      const data = await response.json();
      console.log(data.count);
      return data.count;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSyndicCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/membres-syndic/count');
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCount = async () => {
      const count = await fetchUserCount();
      setUserCount(count);
      const coproprietaireCount = await fetchCoproprietaireCount();
      setCoproprietaireCount(coproprietaireCount);
      const syndicCount = await fetchSyndicCount(); 
       setSyndicCount(syndicCount);
    };
    getCount();
  }, []);

  return {
    userCount,
    coproprietaireCount,
    syndicCount,
  };
};

export default function FeaturedInfo() {
  const { userCount, coproprietaireCount ,syndicCount} = UserCount();

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{userCount}</span>
          <span className="featuredMoneyRate">
            <PermIdentity className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">owners : {coproprietaireCount}</span>
        <br />
        <span className="featuredSub">syndics: {syndicCount} </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Coproperty</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Data</span>
        </div>
        <span className="featuredSub">Full : 1000</span>
        <br />
        <span className="featuredSub">Empty: </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Logins</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Total Data</span>
          <span className="featuredMoneyRate">
            <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">failed attempts : 500</span>
      </div>
    </div>
  );
}
