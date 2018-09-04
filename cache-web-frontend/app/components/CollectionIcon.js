/* eslint-disable max-len */

import React from 'react';
import classNames from 'classnames';

export default class Icon extends React.Component {
  static defaultProps = {
    size: '100%',
    color: '#3a3f41'
  }

  render() {
    const mainClasses = classNames({
      'icon': true,
      [`collection-${this.props.name}`]: true
    });

    return (
      <svg
        style={this.props.styles}
        width={this.props.size}
        height={this.props.size}
        viewBox="0 0 65 65"
        className={mainClasses}
        preserveAspectRatio="xMinYMin meet">
        {this.renderIcon()}
      </svg>
    );
  }

  renderIcon() {
    switch (this.props.name) {
      case 'alarm':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="26"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,20 32,32 40,36"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="21.995" y1="56.005" x2="15" y2="63"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="49" y1="63" x2="42.005" y2="56.005"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="1,8 5,4 15,6 3,18"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="59,4 63,8 61,18 49,6"/>
          </g>
        );

      case 'anchor':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="13" x2="32" y2="63"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="19,50 9,47 6,57"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="45,50 55,47 59,57"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" d="M54.752,47 C51.555,56.301,42.576,63,32,63c-10.575 0-19.553-6.698-22.751-15.998"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" x1="23" y1="17" x2="41" y2="17"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="7" r="6"/>
          </g>
        );

      case 'archive-empty':
        return (
          <g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="5,41 11,1 53,1 59,41"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M21,41c0,6.075,4.925,11,11,11s11-4.925,11-11h16v22 H5V41H21z"/>
          </g>
        );

      case 'archive-full':
        return (
          <g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="5,41 11,1 53,1 59,41"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M21,41c0,6.075,4.925,11,11,11s11-4.925,11-11h16v22 H5V41H21z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="31" x2="52" y2="31"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="21" x2="50" y2="21"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="11" x2="48" y2="11"/>
          </g>
        );

      case 'bag':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="44,18 54,18 54,63 10,63 10,18 20,18"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M22,24V11c0-5.523,4.477-10,10-10s10,4.477,10,10v13"/>
          </g>
        );

      case 'bank-note':
        return (
          <g>
            <rect x="1" y="16" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="32"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M10,44c0-2.762-2.238-5-5-5V25c2.762,0,5-2.238,5-5 h44c0,2.762,2.238,5,5,5v14c-2.762,0-5,2.238-5,5H10z"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="8"/>
          </g>
        );

      case 'battery-empty':
        return (
          <g>
            <rect x="1" y="21" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="58" height="24"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="59,27 63,27 63,39 59,39"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="18,41 5,41 5,25 14,25"/>
          </g>
        );

      case 'battery-full':
        return (
          <g>
            <rect x="1" y="21" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="58" height="24"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="59,27 63,27 63,39 59,39"/>
            <rect x="5" y="25" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="50" height="16"/>
          </g>
        );

      case 'bell':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M32,55h25v-4l-7-7V25c0-9.941-8.059-18-18-18 s-18,8.059-18,18v19l-7,7v4H32z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="41" x2="50" y2="41"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="35" x2="50" y2="35"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M39,55c0,4.418-3.582,8-8,8s-8-3.582-8-8"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="28,7 28,1 36,1 36,7"/>
          </g>
        );

      case 'bolt':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="40,1 17,37 31,37 24,63 50,27 36,27"/>
          </g>
        );

      case 'book-pencil':
        return (
          <g>
            <rect x="1" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="46" height="62"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="9" y1="63" x2="9" y2="2"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="15" x2="42" y2="15"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="21" x2="42" y2="21"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="55,1 55,54 59,62 63,54 63,1 "/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="55" y1="11" x2="63" y2="11"/>
          </g>
        );

      case 'book':
        return (
          <g>
            <rect x="7" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="46" height="62"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="63" x2="15" y2="2"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="20" y1="15" x2="48" y2="15"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="20" y1="21" x2="48" y2="21"/>
          </g>
        );

      case 'bookmark':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="18,1 46,1 46,62 32,48 18,62"/>
          </g>
        );

      case 'calculator':
        return (
          <g>
            <g>
              <rect x="1" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="62"/>
            </g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="8" x2="18" y2="28"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="28" y1="18" x2="8" y2="18"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="56" y1="18" x2="36" y2="18"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="54" x2="26" y2="38"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="38" x2="26" y2="54"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="36" y1="43" x2="56" y2="43"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="36" y1="49" x2="56" y2="49"/>
          </g>
        );

      case 'calendar':
        return (
          <g>
            <g>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="10" x2="18" y2="10"/>
              <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="12,10 1,10 1,58 63,58 63,10 52,10"/>
              <rect x="12" y="6" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="6" height="8"/>
              <rect x="46" y="6" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="6" height="8"/>
              <rect x="10" y="24" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="10" height="10"/>
              <rect x="10" y="42" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="10" height="10"/>
              <rect x="44" y="24" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="10" height="10"/>
              <rect x="44" y="42" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="10" height="10"/>
              <rect x="27" y="24" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="10" height="10"/>
              <rect x="27" y="42" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="10" height="10"/>
            </g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="18" x2="63" y2="18"/>
          </g>
        );

      case 'cards':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="44,59 16,45 36,5 63,19"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="31.899,14.004 28,6 1,20 19,59 32,52.964"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="9" x2="37" y2="11"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="7" y1="23" x2="6" y2="21"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="43" y1="53" x2="42" y2="55"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M33,25c-2.848,5.281,3,15,3,15s11.151,0.28,14-5 c1.18-2.188,1.377-5.718-1-7c-2.188-1.18-5.82-1.188-7,1c1.18-2.188, 0.188-4.82-2-6C37.624,21.718,34.181,22.813,33,25z"/>
          </g>
        );

      case 'cart':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="20" cy="57" r="6"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="44" cy="57" r="6"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="57" x2="38" y2="57"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="14,57 10,2 0,2"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="13,43 56,40 63,10 11,10"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="20,10 22,4 32,4 34,10"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,4 37,1 53,1 56,10"/>
          </g>
        );

      case 'case':
        return (
          <g>
            <g>
              <rect x="1" y="18" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="36"/>
            </g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="30" x2="63" y2="30"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="27,30 27,36 37,36 37,30"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M23,18c0,0,0-8,9-8s9,8,9,8"/>
          </g>
        );

      case 'chronometer':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M51.799,15.202 c10.936,10.933,10.936,28.662,0,39.595c-10.935,10.938-28.664,10.938-39.598,0c-10.935-10.933-10.935-28.662,0-39.595 C23.135,4.266,40.864,4.266,51.799,15.202z"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,7 32,1 38,1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="1" x2="32" y2="1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="63" x2="32" y2="59"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="11" x2="32" y2="7"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="4" y1="35" x2="8" y2="35"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="56" y1="35" x2="60" y2="35"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14.564" y1="17.565" x2="17.394" y2="20.394"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46.606" y1="49.606" x2="49.436" y2="52.436"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="49.436" y1="17.565" x2="46.607" y2="20.394"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="17.395" y1="49.606" x2="14.564" y2="52.436"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="21" x2="32" y2="33"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="35" r="3"/>
          </g>
        );

      case 'clessidre':
        return (
          <g>
            <rect x="14" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="36" height="4"/>
            <rect x="14" y="59" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="36" height="4"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M18,59c0,0,0-8,0-14s29-19,29-25c0-2,0-15,0-15"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M47,59c0,0,0-8,0-14S18,26,18,20c0-2,0-15,0-15"/>
          </g>
        );

      case 'clock':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M53.92,10.081 c12.107,12.105,12.107,31.732,0,43.838c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838 C22.186-2.027,41.813-2.027,53.92,10.081z"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,12 32,32 41,41"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="4" y1="32" x2="8" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="56" y1="32" x2="60" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="60" x2="32" y2="56"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="8" x2="32" y2="4"/>
          </g>
        );

      case 'cloud':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M41,50h14c4.565,0,8-3.582,8-8s-3.435-8-8-8 c0-11.046-9.52-20-20.934-20C23.966,14,14.8,20.732,13,30c0,0-0.831,0-1.667,0C5.626,30,1,34.477,1,40s4.293,10,10,10H41"/>
          </g>
        );

      case 'compass':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="35" r="28.292"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="37,40 45,21 26,29 19,47"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="29" x2="37" y2="40"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M36.9,7C36.965,6.677,37,6.342,37,6 c0-2.761-2.239-5-5-5s-5,2.239-5,5c0,0.342,0.035,0.677,0.1,1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="7" x2="32" y2="12"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="58" x2="32" y2="63"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="60" y1="35" x2="55" y2="35"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="9" y1="35" x2="4" y2="35"/>
          </g>
        );

      case 'cup':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M16,27c0,4.418,6.059,8,16,8s16-3.582,16-8V1H16V27z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="20" y1="63" x2="44" y2="63"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="35" x2="32" y2="63"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M16,7H7c0,0,0,9,9,9"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M48,7h9c0,0,0,9-9,9"/>
          </g>
        );

      case 'diamond':
        return (
          <g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="29,6 46,6 63,27 32,58 1,27 18,6 32,6 32,58"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,57 18,27 24,6"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,57 46,27 40,6"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="27" x2="63" y2="27"/>
          </g>
        );

      case 'display':
        return (
          <g>
            <g>
              <rect x="1" y="10" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="41"/>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="63" x2="42" y2="63"/>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="63" x2="32" y2="51"/>
            </g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="43" x2="64" y2="43"/>
          </g>
        );

      case 'drop':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M11,41.265C11.052,53.27,20.401,63,32,63 s21-9.73,21-21.735C53,25.729,32.035,1,32.035,1S10.931,25.729,11,41.265z"/>
          </g>
        );

      case 'exclamation':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M53.92,10.081c12.107,12.105,12.107,31.732,0,43.838 c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838C22.186-2.027,41.813-2.027,53.92,10.081z"/>
            <line stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="17" x2="32" y2="39"/>
            <line stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="43" x2="32" y2="47"/>
          </g>
        );

      case 'eye-closed':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17 S1,32,1,32z"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="7"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="9" y1="55" x2="55" y2="9"/>
          </g>
        );

      case 'eye':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17 S1,32,1,32z"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="7"/>
          </g>
        );

      case 'female':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="39" cy="25" r="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="63" x2="22" y2="42"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="46" x2="18" y2="63"/>
          </g>
        );

      case 'flag':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="0" x2="12" y2="64"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="12,6 53,6 47,18 53,30 12,30"/>
          </g>
        );

      case 'folder':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="63,18 63,54 1,54 1,10 22,10 30,18"/>
          </g>
        );

      case 'font':
        return (
          <g>
            <g>
              <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="38,51 23,9 22,9 7,51"/>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="33" y1="37" x2="12" y2="37"/>
            </g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M44,34c0,0,1.5-2,5.5-2s5.5,3,5.5,5s0,10,0,10 s0,3,2.5,3"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M55,40h-5c0,0-7,0-7,5s4,5,5,5s7,0,7-7"/>
            <rect x="1" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="62"/>
          </g>
        );

      case 'gear':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,1 26,1 26,10 20,12 14,6 6,14 12,20 10,26 1,26 1,38 10,38 12,44 6,50 14,58 20,52 26,54 26,63 32,63 38,63 38,54 44,52 50,58 58,50 52,44 54,38 63,38 63,26 54,26 52,20 58,14 50,6 44,12 38,10 38,1"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="6"/>
          </g>
        );

      case 'geolocation':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="22" r="6"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M53,22.735C52.948,10.73,43.599,1,32,1 s-21,9.73-21,21.735C11,38.271,31.965,63,31.965,63S53.069,38.271,53,22.735z"/>
          </g>
        );

      case 'gift':
        return (
          <g>
            <rect x="1" y="18" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="9"/>
            <rect x="6" y="27" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="52" height="31"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="58" x2="32" y2="18"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M32,18c0,0-13,0.101-13-9c0-7,13-4.068,13,2 C32,17.067,32,18,32,18z"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M32,18c0,0,13,0.101,13-9c0-7-13-4.068-13,2 C32,17.067,32,18,32,18z"/>
          </g>
        );

      case 'globe':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M32,1c14.359,0,27,12.641,27,27S46.359,55,32,55 c-10,0-13-4-13-4"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="28" r="20"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="54" x2="32" y2="64"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="63" x2="42" y2="63"/>
          </g>
        );

      case 'graph':
        return (
          <g>
            <rect x="10" y="29" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="12" height="34"/>
            <rect x="42" y="39" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="12" height="24"/>
            <rect x="26" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="12" height="62"/>
          </g>
        );

      case 'hammer':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="20" x2="41" y2="39"/>
            <rect x="46.257" y="35.065" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 120.5036 47.0858)" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="8.485" height="26.87"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M1,19L17,3c6,6,13,1,13,1l4,4L12,30L1,19z"/>
          </g>
        );

      case 'headset':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M11,48C5.477,48,1,43.523,1,38s4.477-10,10-10h2v20 H11z"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M53,28c5.523,0,10,4.477,10,10s-4.477,10-10,10h-2 V28H53z"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M13,31v-9c0,0,0-16,19-16s19,16,19,16v6"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="51,48 51,53 36,59 28,59 28,55 36,55 36,58"/>
          </g>
        );

      case 'heart-broken':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M1,21c0,20,31,38,31,38s31-18,31-38 c0-8.285-6-16-15-16c-8.285,0-16,5.715-16,14c0-8.285-7.715-14-16-14C7,5,1,12.715,1,21z"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="29,57 36,50 30,44 36,38 30,32 38,24 32,19 32,17"/>
          </g>
        );

      case 'heart':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M1,21c0,20,31,38,31,38s31-18,31-38 c0-8.285-6-16-15-16c-8.285,0-16,5.715-16,14c0-8.285-7.715-14-16-14C7,5,1,12.715,1,21z"/>
          </g>
        );

      case 'helm':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="40" x2="32" y2="64"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="0" x2="32" y2="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="37" x2="59" y2="54"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="5" y1="10" x2="26" y2="27"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="27" x2="59" y2="11"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="5" y1="53" x2="26" y2="37"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="8"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="24"/>
          </g>
        );

      case 'home':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,3 2,33 11,33 11,63 23,63 23,47 39,47 39,63 51,63 51,33 62,33"/>
          </g>
        );

      case 'info':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M53.92,10.081c12.107,12.105,12.107,31.732,0,43.838 c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838C22.186-2.027,41.813-2.027,53.92,10.081z"/>
            <line stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="47" x2="32" y2="25"/>
            <line stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="21" x2="32" y2="17"/>
          </g>
        );

      case 'ipod':
        return (
          <g>
            <rect x="16" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="32" height="62"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="36" x2="48" y2="36"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="5" x2="48" y2="5"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" cx="31.5" cy="49.5" r="9.5"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" cx="31.5" cy="49.5" r="2.5"/>
          </g>
        );

      case 'joypad':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M50,27H14C6.82,27,1,32.82,1,40s5.82,13,13,13 c4.6,0,8.632-2.396,10.943-6h14.113C41.368,50.604,45.4,53,50,53c7.18,0,13-5.82,13-13S57.18,27,50,27z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" x1="14" y1="32" x2="14" y2="48"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" x1="22" y1="40" x2="6" y2="40"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" cx="50" cy="39.99" r="7"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" x1="50" y1="33" x2="50" y2="47"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" x1="57" y1="40" x2="43" y2="40"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,27 32,21 46,21 46,14 36,14 36,11"/>
          </g>
        );

      case 'key':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="51" cy="32" r="12"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="0" y1="32" x2="38" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="32" x2="6" y2="42"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="32" x2="14" y2="38"/>
          </g>
        );

      case 'keyboard':
        return (
          <g>
            <rect x="1" y="22" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="30"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="7,22 7,14 21,14 21,7 11,7 11,4"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="4" y1="29" x2="8" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="29" x2="14" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="29" x2="20" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="29" x2="26" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="28" y1="29" x2="32" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="34" y1="29" x2="38" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="40" y1="29" x2="44" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="29" x2="50" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="52" y1="29" x2="56" y2="29"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="4" y1="45" x2="8" y2="45"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="45" x2="14" y2="45"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="45" x2="42" y2="45"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="50" y1="45" x2="54" y2="45"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="56" y1="45" x2="60" y2="45"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="44" y1="45" x2="48" y2="45"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="8" y1="37" x2="12" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="37" x2="18" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="20" y1="37" x2="24" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="37" x2="30" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="37" x2="36" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="37" x2="42" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="44" y1="37" x2="48" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="50" y1="37" x2="54" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="56" y1="37" x2="60" y2="37"/>
          </g>
        );

      case 'laptop':
        return (
          <g>
            <rect x="8" y="12" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="48" height="34"/>
            <rect x="1" y="46" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="6"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="34" y1="16" x2="30" y2="16"/>
          </g>
        );

      case 'life-buoy':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="31"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="15"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="18" x2="26" y2="1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="18" x2="38" y2="1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="63" x2="26" y2="46"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="63" x2="38" y2="46"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="26" x2="63" y2="26"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="38" x2="63" y2="38"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="26" x2="18" y2="26"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="38" x2="18" y2="38"/>
          </g>
        );

      case 'lightbulb':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M21,40v5h22l0.001-5.107C49,36.195,53,29.564,53,22 c0-11.598-9.402-21-21-21s-21,9.402-21,21C11,29.565,14.998,36.304,21,40z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="28" y1="45" x2="25" y2="25"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="36" y1="45" x2="39" y2="25"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="25,26 29,29 32,26 35,29 39,26"/>
            <rect x="21" y="45" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="22" height="6"/>
            <rect x="23" y="51" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="18" height="6"/>
            <rect x="25" y="57" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="14" height="6"/>
          </g>
        );

      case 'link':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M37.004,32.166c1.224,0.533,2.576,0.829,3.997,0.828 c3.271-0.003,6.175-1.576,7.998-4.006L60.99,16.98c1.255-1.673,1.998-3.751,1.996-6.002c-0.003-5.522-4.484-9.997-10.007-9.993 c-2.251,0.002-4.327,0.747-5.999,2.004L33.989,15.998c-1.768,1.805-2.997,4.277-2.996,7.003c0.001,1.424,0.3,2.778,0.837,4.003"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M37.004,32.166"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M31.831,27.004c0.053,0.121,0.107,0.24,0.166,0.358"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M26.997,31.836c-1.225-0.535-2.577-0.831-3.998-0.83 c-2.251,0.002-4.328,0.747-5.999,2.004L4.01,46.02c-1.768,1.804-2.997,4.276-2.995,7.002c0.003,5.522,4.484,9.997,10.007,9.993 c3.271-0.003,6.174-1.576,7.997-4.006L31.01,47.001c1.255-1.673,1.998-3.751,1.996-6.002c-0.001-1.422-0.299-2.774-0.835-3.998"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="23.006" y1="41.006" x2="40.994" y2="22.994"/>
          </g>
        );

      case 'lock-open':
        return (
          <g>
            <rect x="8" y="33" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="48" height="30"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M16,33V17c0-8.837,7.163-16,16-16s16,7.163,16,16v3"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="47" r="4"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="51" x2="32" y2="55"/>
          </g>
        );

      case 'lock':
        return (
          <g>
            <rect x="8" y="33" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="48" height="30"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M16,33V17c0-8.837,7.163-16,16-16s16,7.163,16,16 v16"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="47" r="4"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="51" x2="32" y2="55"/>
          </g>
        );

      case 'magnifier':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="21" cy="21" r="20"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="35" y1="35" x2="41" y2="41"/>
            <rect x="46.257" y="37.065" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 121.9178 50.5)" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="8.485" height="26.87"/>
          </g>
        );

      case 'mail-open':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="36" y1="9" x2="45" y2="9"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="19" y1="17" x2="45" y2="17"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="19" y1="25" x2="45" y2="25"/>
            <g>
              <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="1,26 32,45.434 63,26"/>
              <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="11.334,21.667 1,26 1,63 63,63 63,26 63,26 52.666,21.667"/>
              <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="11,32 11,1 53,1 53,32"/>
            </g>
          </g>
        );

      case 'mail':
        return (
          <g>
            <rect x="1" y="13" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="37"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="1,13 32,33 63,13"/>
          </g>
        );

      case 'male':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="25" cy="39" r="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="63" y1="1" x2="42" y2="22"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="45,1 63,1 63,19"/>
          </g>
        );

      case 'map':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="1,59 22,51 42,59 63,51 63,5 42,13 22,5 1,13"/>
            <g>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="5" x2="22" y2="51"/>
            </g>
            <g>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="42" y1="13" x2="42" y2="59"/>
            </g>
          </g>
        );

      case 'megaphone':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="1,29 1,35 7,41 45.5,41 61,53 63,53 63,29 63,5 61,5 45.5,17 7,17 1,23"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="19,41 12,59 18,59 28,41"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="43" y1="17" x2="43" y2="41"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="36" y1="41" x2="36" y2="17"/>
          </g>
        );

      case 'message':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="16" x2="54" y2="16"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="26" x2="54" y2="26"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="36" x2="54" y2="36"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,47 63,47 63,5 1,5 1,47 18,47 18,59"/>
          </g>
        );

      case 'message-happy':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M24,30c0,4.418,3.582,8,8,8s8-3.582,8-8"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="20" x2="20" y2="20"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="20" x2="44" y2="20"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,47 63,47 63,5 1,5 1,47 18,47 18,59"/>
          </g>
        );

      case 'message-heart':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,47 63,47 63,5 1,5 1,47 18,47 18,59"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M22,23c0,6.666,10,12,10,12s10-5.334,10-12 c0-2.762-2-5-5-5c-2.762,0-5,2.238-5,5c0-2.762-2.238-5-5-5C24,18,22,20.238,22,23z"/>
          </g>
        );

      case 'message-note':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,47 63,47 63,5 1,5 1,47 18,47 18,59"/>
            <g>
              <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="35" cy="31" r="3"/>
              <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="25" cy="33" r="3"/>
              <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="38,31 38,16 28,18 28,33"/>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="28" y1="22" x2="38" y2="20"/>
            </g>
          </g>
        );

      case 'message-sad':
        return (
          <g>
            <g>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="20" x2="20" y2="20"/>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="20" x2="44" y2="20"/>
              <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,47 63,47 63,5 1,5 1,47 18,47 18,59"/>
            </g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M40,38c0-4.418-3.582-8-8-8s-8,3.582-8,8"/>
          </g>
        );

      case 'microphone-old':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="17" y1="63" x2="47" y2="63"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="62" x2="32" y2="42"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M48,26c0,8-8,16-16,16s-16-8-16-16"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M40,27c0,4.418-3.582,8-8,8s-8-3.582-8-8V9 c0-4.418,3.582-8,8-8s8,3.582,8,8V27z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="29" y1="13" x2="24" y2="13"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="29" y1="23" x2="24" y2="23"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="40" y1="13" x2="35" y2="13"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="40" y1="23" x2="35" y2="23"/>
          </g>
        );

      case 'microphone':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="45" cy="15" r="14"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,20 6,46 14,54 40,28"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="24" y1="28" x2="32" y2="36"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="10,50 6,54 15,63 20,63 42,41 47,46 40,53"/>
          </g>
        );

      case 'mixer':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="19" x2="12" y2="64"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="52" y1="0" x2="52" y2="45"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="38" x2="32" y2="64"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="0" x2="32" y2="26"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="12" cy="13" r="6"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="52" cy="51" r="6"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="6"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="0" x2="12" y2="7"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="52" y1="57" x2="52" y2="64"/>
          </g>
        );

      case 'moon':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M6,52c14.359,0,26-11.641,26-26 c0-9.994-6.729-18.648-15-23c3.396-1.277,8.158-2,12-2c17.121,0,31,13.879,31,31S46.121,63,29,63c-9.505,0-18.313-4.265-24-11 C5.23,52.006,5.768,52,6,52z"/>
          </g>
        );

      case 'mouse':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M48,17c0-8.836-7.164-16-16-16S16,8.164,16,17v30 c0,8.836,7.164,16,16,16s16-7.164,16-16V17z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="1" x2="32" y2="21"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="21" x2="48" y2="21"/>
          </g>
        );

      case 'mute':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="4,32 4,20 16,20 34,2 34,32 34,62 16,44 4,44"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="42" y1="23" x2="60" y2="41"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="42" y1="41" x2="60" y2="23"/>
          </g>
        );

      case 'note':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="18" cy="55" r="8"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="46" cy="49" r="8"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="54,49 54,1 26,7 26,55"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="23" x2="54" y2="17"/>
          </g>
        );

      case 'notebook':
        return (
          <g>
            <rect x="11" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="42" height="62"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="41" y1="1" x2="41" y2="62"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="16" x2="7" y2="16"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="8" x2="7" y2="8"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="24" x2="7" y2="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="32" x2="7" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="40" x2="7" y2="40"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="48" x2="7" y2="48"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="56" x2="7" y2="56"/>
          </g>
        );

      case 'paint-brush':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="30,42 26,46 18,38 22,34 62,1 63,2"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="34" x2="30" y2="42"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M26,46c0,0-8,17-25,17c0,0,2.752-16.314,9-21 c4-3,8-4,8-4"/>
          </g>
        );

      case 'paint-bucket':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="3,38 28,63 54,37 61,36 33,8"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" d="M32,27V6 c0-2.762-2.238-5-5-5s-5,2.238-5,5v13"/>
          </g>
        );

      case 'paint-roller':
        return (
          <g>
            <rect x="7" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="48" height="17"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="2" y1="9" x2="7" y2="9"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="55,9 61,9 61,24 32,24 32,41"/>
            <rect x="28" y="42" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="8" height="21"/>
          </g>
        );

      case 'paperplane':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="1,30 63,1 23,41"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="34,63 63,1 23,41"/>
          </g>
        );

      case 'pencil':
        return (
          <g>
            <g>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="20" y1="54" x2="10" y2="44"/>
            </g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="10,44 1,62 2,63 20,54 63,11 53,1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="54" y1="20" x2="44" y2="10"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="58" y1="16" x2="48" y2="6"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="5,54 9,55 10,59"/>
          </g>
        );

      case 'pencil-ruler-pen':
        return (
          <g>
            <rect x="22" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="16" height="62"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="31" y1="12" x2="38" y2="12"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="22" x2="35" y2="22"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="42" x2="35" y2="42"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="31" y1="32" x2="38" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="31" y1="52" x2="38" y2="52"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="16,63 16,10 12,2 8,10 8,63"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="53" x2="8" y2="53"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="56,3 56,53 52,61 48,53 48,3"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="48,7 44,7 44,17"/>
          </g>
        );

      case 'photo':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="46,20 38,10 26,10 18,20 1,20 1,52 63,52 63,20"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="36" r="8"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="9" y1="20" x2="9" y2="52"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="54" y1="28" x2="54" y2="28"/>
          </g>
        );

      case 'picture':
        return (
          <g>
            <g>
              <rect x="1" y="16" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="52" height="40"/>
            </g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="10,14 10,8 63,8 63,48 55,48"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="1,46 15,32 29,48 39,42 53,54"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="40" cy="29" r="5"/>
          </g>
        );

      case 'pin':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="64" x2="32" y2="36"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,1 22,1 22,5 27,9 25,26 16,30 15,36 32,36"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,1 42,1 42,5 37,9 39,26 48,30 49,36 32,36"/>
          </g>
        );

      case 'postcard':
        return (
          <g>
            <g>
              <rect x="1" y="13" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="41"/>
            </g>
            <rect x="49" y="19" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="8" height="10"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="39" y1="18" x2="39" y2="49"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="21" x2="34" y2="21"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="27" x2="30" y2="27"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="33" x2="32" y2="33"/>
          </g>
        );

      case 'printer':
        return (
          <g>
            <rect x="16" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="32" height="19"/>
            <g>
              <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M16.5,52"/>
            </g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="16,52 1,52 1,20 63,20 63,52 48,52  "/>
            <rect x="16" y="39" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="32" height="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="27" x2="10" y2="27"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="27" x2="16" y2="27"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="47" x2="42" y2="47"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="22" y1="55" x2="42" y2="55"/>
            <g>
              <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M16,52"/>
            </g>
          </g>
        );

      case 'question':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M53.92,10.081c12.107,12.105,12.107,31.732,0,43.838 c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838C22.186-2.027,41.813-2.027,53.92,10.081z"/>
            <line stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="30" y1="43" x2="30" y2="47"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M24,21c0-3,2-5,8-5c5,0,8,3,8,7s-6,7-6,7s-4,2-4,8v1"/>
          </g>
        );

      case 'radio':
        return (
          <g>
            <rect x="1" y="22" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="38"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="20" cy="41" r="13"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="8" y1="36" x2="32" y2="36"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="8" y1="46" x2="32" y2="46"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="25" y1="29" x2="25" y2="53"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="29" x2="15" y2="53"/>
            <rect x="43" y="28" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="5" height="4"/>
            <rect x="52" y="28" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="5" height="4"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="52" cy="49" r="5"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="52" y1="44" x2="52" y2="48"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="3,22 3,18 9,18 9,22"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="53,4 6,16 6,18"/>
          </g>
        );

      case 'record-player':
        return (
          <g>
            <rect x="1" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="62"/>
            <rect x="53" y="7" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="4" height="8"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="27.5" cy="27.5" r="22.5"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="27.5" cy="27.5" r="6"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="57" y1="15" x2="57" y2="48"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="57,49 51,52 51,48 57,45"/>
            <rect x="5" y="56" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="6" height="3"/>
            <rect x="15" y="56" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="6" height="3"/>
          </g>
        );

      case 'rss':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" d="M63.051,56 c0-13.416-4.804-25.711-12.786-35.256"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" d="M50.265,20.744 C40.177,8.677,25.01,1,8.051,1"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" d="M51.769,56 c0-24.145-19.574-43.718-43.718-43.718"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" d="M40.486,56 c0-17.913-14.523-32.436-32.436-32.436"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" d="M29.205,56 c0-11.684-9.472-21.154-21.154-21.154"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" cx="8.051" cy="56" r="7.051"/>
          </g>
        );

      case 'safe':
        return (
          <g>
            <rect x="1" y="5" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="54"/>
            <rect x="11" y="11" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="46" height="42"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="17" x2="12" y2="17"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="27" x2="12" y2="27"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="37" x2="12" y2="37"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="47" x2="12" y2="47"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="44" cy="32" r="3"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="44" cy="32" r="9"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="35" y1="32" x2="41" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="44" y1="29" x2="44" y2="23"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="47" y1="32" x2="53" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="44" y1="35" x2="44" y2="41"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="34" x2="50" y2="38"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="46" y1="30" x2="50" y2="26"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="42" y1="30" x2="38" y2="26"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="42" y1="34" x2="38.026" y2="38"/>
          </g>
        );

      case 'sheet':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="23,1 55,1 55,63 9,63 9,15"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="9,15 23,15 23,1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="14" x2="46" y2="14"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="24" x2="46" y2="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="34" x2="46" y2="34"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="44" x2="46" y2="44"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="54" x2="46" y2="54"/>
          </g>
        );

      case 'signs':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="55,24 22,24 22,12 55,12 62,18"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="9,28 42,28 42,40 9,40 2,34"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="40" x2="32" y2="64"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="28" x2="32" y2="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="12" x2="32" y2="7"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="24" y1="63" x2="40" y2="63"/>
          </g>
        );

      case 'smartphone':
        return (
          <g>
            <rect x="16" y="1" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="32" height="62"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="28" y1="5" x2="36" y2="5"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="51" x2="48" y2="51"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="9" x2="48" y2="9"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-linejoin="bevel" stroke-miterlimit="10" cx="32" cy="57" r="2"/>
          </g>
        );

      case 'snowflake':
        return (
          <g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="1,24 9,32 1,40"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="63,40 55,32 63,24"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="24,63 32,55 40,63"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="40,1 32,9 24,1"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="5,49 15,49 15,59"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="59,15 49,15 49,5"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="26" x2="49" y2="15"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="49" x2="26" y2="38"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="15,5 15,15 5,15"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="49,59 49,49 59,49"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="38" x2="49" y2="49"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="15" y1="15" x2="26" y2="26"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="40" y1="32" x2="55" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="9" y1="32" x2="24" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="40" x2="32" y2="55"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="9" x2="32" y2="24"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="8"/>
          </g>
        );

      case 'star':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,47 12,62 20,38 2,24 24,24 32,1 40,24 62,24 44,38 52,62"/>
          </g>
        );

      case 'sun':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="16"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="10" x2="32" y2="0"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="64" x2="32" y2="54"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="54" y1="32" x2="64" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="0" y1="32" x2="10" y2="32"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="48" y1="16" x2="53" y2="11"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="11" y1="53" x2="16" y2="48"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="48" y1="48" x2="53" y2="53"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="11" y1="11" x2="16" y2="16"/>
          </g>
        );

      case 'tag':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="25,1 63,39 39,63 1,25 1,1"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="17" cy="17" r="6"/>
          </g>
        );

      case 'target':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M53.92,10.081c12.107,12.105,12.107,31.732,0,43.838 c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838C22.186-2.027,41.813-2.027,53.92,10.081z"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="22.999"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="15"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="6.999"/>
          </g>
        );

      case 'ticket':
        return (
          <g>
            <g>
              <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M57,18c-1.504,1.504-2.705,2-5,2 c-4.59,0-8-3.41-8-8c0-2.295,0.496-3.496,2-5l-6-6L1,40l6,6c1.504-1.504,2.705-2,5-2c4.59,0,8,3.41,8,8c0,2.295-0.496,3.496-2,5 l6,6l39-39L57,18z"/>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="15" x2="30" y2="19"/>
              <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="45" y1="34" x2="49" y2="38"/>
            </g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="21" x2="36" y2="25"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="39" y1="28" x2="43" y2="32"/>
          </g>
        );

      case 'todo-list':
        return (
          <g>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="24" x2="38" y2="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="34" x2="38" y2="34"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="44" x2="38" y2="44"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="16" y1="54" x2="38" y2="54"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="24" x2="8" y2="24"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="34" x2="8" y2="34"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="44" x2="8" y2="44"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="12" y1="54" x2="8" y2="54"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="14,8 1,8 1,63 45,63 45,8 32,8"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="27,5 27,1 19,1 19,5 15,5 13,13 33,13 31,5"/>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="55,1 55,54 59,62 63,54 63,1"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="55" y1="11" x2="63" y2="11"/>
          </g>
        );

      case 'trash':
        return (
          <g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="25,8 25,1 39,1 39,8"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="14,10 14,63 50,63 50,10"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="20" x2="26" y2="54"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="38" y1="20" x2="38" y2="54"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="9" x2="54" y2="9"/>
          </g>
        );

      case 'usb':
        return (
          <g>
            <rect x="5.308" y="4.601" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.0061 14.5)" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="18.385" height="19.799"/>
            <rect x="22.151" y="15.08" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -15.3259 37)" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="29.698" height="43.841"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="7" y1="13" x2="16" y2="22"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="13" y1="7" x2="22" y2="16"/>
          </g>
        );

      case 'video':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="46,30 63,20 63,52 46,42 46,52 1,52 1,20 46,20"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="28" x2="10" y2="28"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="14" y1="28" x2="18" y2="28"/>
            <rect x="7" y="36" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="18" height="10"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="6,12 32,12 40,20"/>
          </g>
        );

      case 'volume':
        return (
          <g>
            <polygon fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="3,32 3,20 15,20 33,2 33,32 33,62 15,44 3,44"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M41,42c5.522,0,10-4.478,10-10s-4.478-10-10-10"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M41,12c11.046,0,20,8.954,20,20s-8.954,20-20,20"/>
          </g>
        );

      case 'wallet':
        return (
          <g>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="61,44 61,55 1,55 1,15 61,15 61,26"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="6,9 54,9 54,15"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M6,9c-2.762,0-5,2.239-5,5"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M43.125,26c-4.972,0-9,4.029-9,9c0,4.97,4.028,9,9,9 H63V26H43.125z"/>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="44" cy="35" r="3"/>
          </g>
        );

      case 'watch':
        return (
          <g>
            <circle fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" cx="32" cy="32" r="20"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="20,15 20,1 44,1 44,15"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="44,49 44,63 20,63 20,49"/>
            <polyline fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" points="32,20 32,32 40,36"/>
          </g>
        );

      case 'webpage':
        return (
          <g>
            <rect x="1" y="7" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="62" height="50"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="1" y1="15" x2="63" y2="15"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="10" y1="11" x2="6" y2="11"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="18" y1="11" x2="14" y2="11"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="26" y1="11" x2="22" y2="11"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="25" x2="33" y2="25"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="33" x2="33" y2="33"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="6" y1="41" x2="33" y2="41"/>
            <rect x="38" y="25" fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" width="19" height="16"/>
          </g>
        );

      case 'world':
        return (
          <g>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M32.001,0.887c17.184,0,31.113,13.929,31.112,31.113 C63.114,49.185,49.184,63.115,32,63.113C14.815,63.114,0.887,49.185,0.888,32.001C0.885,14.816,14.815,0.887,32.001,0.887z"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="32" y1="1" x2="32" y2="63"/>
            <line fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" x1="63" y1="32" x2="1" y2="32"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M30,1c0,0-14,11-14,31s14,31,14,31"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M34,1c0,0,14,11,14,31S34,63,34,63"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M8,12c0,0,5,10,24,10s24-10,24-10"/>
            <path fill="none" stroke={this.props.color} strokeWidth="2" stroke-miterlimit="10" d="M8,52c0,0,5-10,24-10s24,10,24,10"/>
          </g>
        );

      default:
        return null;
    }
  }
}
