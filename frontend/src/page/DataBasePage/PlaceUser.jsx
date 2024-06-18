
import React, { Fragment } from 'react';
import { HeaderUser } from '../../components/Header/HeaderUser';
import PlaceUser from '../../components/User/PlaceUser';
import Place2User from '../../components/User/Place2User';
import { NewsUser, NewsUser2 } from '../../components/User/NewsUser';


function PlaceUserPage() {
    return (
      <Fragment>
        <HeaderUser />
        <PlaceUser code='1'/>
      </Fragment>
        
    );
  }

  function PlaceUserPage1() {
    return (
      <Fragment>
        <HeaderUser />
        <PlaceUser code='2'/>
      </Fragment>
        
    );
  }

  
  function PlaceUserPage2 () {
    return (
      <Fragment>
        <HeaderUser />
        <Place2User/>
      </Fragment>
        
    );
  }

  function NewsPage () {
    return (
      <Fragment>
        <HeaderUser />
        <NewsUser2/>
      </Fragment>
        
    );
  }
export {PlaceUserPage, PlaceUserPage1, PlaceUserPage2, NewsPage};