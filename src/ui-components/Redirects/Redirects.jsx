import React from 'react';
import {
  Redirect
} from 'react-router-dom';

const Redirects = ({to, shouldRedirect, children}) =>
  shouldRedirect ?
    <Redirect to={to} /> :
    children;

export default Redirects;