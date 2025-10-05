import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300 pb-2">
        Zenith To-Do
      </h1>
      <p className="text-slate-400 text-lg">Your tasks, perfectly organized.</p>
    </header>
  );
};

export default Header;
