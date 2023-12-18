import React, { useEffect, useState } from "react";
import MainWrapper from "./MainWrapper";
import { SectionWrapper } from "./Section";
import { pages, settings } from "./constants";
import { useFetchLoggedInUser } from "./api";
import { Link, useNavigate } from "react-router-dom";
export const LandingPage = () => {
  const navigate = useNavigate();

  const highlightItems = [
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
  ];
  console.log('LandingPage 3333', pages)
  const [userInSession, setUserInSession] = useState(null);

  // Use the hook to fetch the logged-in user on component mount
  useFetchLoggedInUser(setUserInSession);
  useEffect(() => {
    if (userInSession) {
      navigate(`/dashboard/${userInSession.uid}`);
    }
  }, [userInSession, navigate]);
  return (
    <MainWrapper navbar={true} pages={pages} settings={settings} login={true} logoIm>
        <SectionWrapper highlightItems={highlightItems}>
        </SectionWrapper>
    </MainWrapper>
  );
};
