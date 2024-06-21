const Banner = () => {
    return (
        <div className="bg-cover bg-center h-64 relative" style={{ backgroundImage: 'url(/banner.jpg)' }}>
        <div className="bg-opacity-50 h-full flex items-center justify-center banner">
          <h1 className="text-black text-3xl text-center font-bold relative z-10">People who love to eat are always Best People</h1>
          <h2 className="h2 bottom-6 right-7  bg-opacity-50 p-2">- Julia Child</h2>
        </div>
      </div>
    );
  };
  
  export default Banner;
  