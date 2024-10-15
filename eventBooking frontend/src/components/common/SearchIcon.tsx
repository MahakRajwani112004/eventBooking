// components/SearchIcon.tsx
import { FC } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import FontAwesome Search icon

const SearchIcon: FC<{ size?: number }> = ({ size = 24 }) => {
  return <FaSearch size={size} />;
};

export default SearchIcon;
