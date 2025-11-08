const Footer = () => {
  return (
    <footer className=" bg-[#2d2d3085] h-[10%] text-white flex flex-col items-center gap-1 text-[12px]">
      <p className="text-black">
        Copyright @{new Date().getFullYear()} | All Rights Reserved
      </p>
      <h4>Alpha Software Systems</h4>
    </footer>
  );
};

export default Footer;
