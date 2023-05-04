import React from 'react';
import styles from "./avatar.module.less"
import { classnames } from '../utils';
import imageUrl from '@/assets/images/avatar.png'

export const Avatar = (props) => {
  const { src, altText, className, size, circle } = props
  return (
    <div className={classnames(styles.avatar, circle && styles.circle, className,)} style={{ width: size, height: size }}>
      <img src={src || imageUrl} alt={altText} />
    </div>
  );
};

Avatar.defaultProps = {
  src: null,
  altText: 'User Avatar',
  circle: true,
};

