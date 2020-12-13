import React from 'react';
import { Images } from '../../config';
import PROFILE_PIC_ICON from '../../assets/profile-pic-icon.png';

const ProfilePicIcon = (props) => (
  <img src={PROFILE_PIC_ICON} alt="Profile Pic Icon" title="Profile Pic Icon" {...props} />
);

export default ProfilePicIcon;
