import React from "react";
import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
  FaHome,
  FaWpforms,
  FaBusinessTime,
  FaSpinner,
} from "react-icons/fa";
export const links = [
  {
    id: 1,
    url: "/",
    text: "Home",
    icon: <FaHome />,
  },

  {
    id: 2,
    url: "/todos",
    text: "AddTodo",
    icon: <FaWpforms />,
  },
  {
    id: 3,
    url: "/random-task",
    text: "RandomTask",
    icon: <FaSpinner />,
  },
  {
    id: 4,
    url: "/time-table",
    text: "Timetable",
    icon: <FaBusinessTime />,
  },
];

export const social = [
  {
    id: 1,
    url: "https://www.twitter.com",
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: "https://www.twitter.com",
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: "https://www.twitter.com",
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: "https://www.twitter.com",
    icon: <FaBehance />,
  },
  {
    id: 5,
    url: "https://www.twitter.com",
    icon: <FaSketch />,
  },
];
