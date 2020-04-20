import React from "react";
import titleIcon from '../../assets/image/火.png'
import user from '../../assets/img/v2-1.jpg'
import search from '../../assets/image/search.png'
import add from '../../assets/image/add group.png'
import './SearchTitle.scss'

const SearchTitle = () => {
  return (
    <div className='title'>
      <div className="title_icon">
        <img src={titleIcon} alt='title_icon'/>
      </div>
      <div className="title_content">
        <img src={user} alt="user" className="left"/>
        <div className="right">
          <img src={search} alt="search" className="search"/>
          <img src={add} alt="add" className="add"/>
        </div>
      </div>
    </div>
  )
}

export default SearchTitle
