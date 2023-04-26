import React from 'react';
import "./style.less"
import { setClassName } from '../utils';
import imageUrl from '@/assets/images/avatar.png'

export const Avatar = (props) => {
  const { imageUrl, altText, className, size, circle } = props
  const classStyle = setClassName({
    name: 'avatar',
    extra: [size, circle && 'circle'],
    className
  })
  return (
    <div className={classStyle} style={{ width: size, height: size }}>
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

Avatar.defaultProps = {
  imageUrl,
  altText: 'User Avatar',
  circle: true,
};

