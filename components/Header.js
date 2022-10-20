import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import React, { memo, useEffect, useState } from "react";
import AppButton from "./button/AppButton";
import MobileNav from "./MobileNav";

const Header = () => {
  let navs = [
    { label: "About Us", path: "/about" },
    { label: "Our services", path: "/services" },
    { label: "Blog", path: "https://www.blog.chaindustry.io" },
    { label: "Academy", path: "https://www.academy.chaindustry.io" }
  ];
  const [show, setShow] = useState(false);
  const toggleNav = (bool) => {
    return setShow(bool);
  };
  //   Desktop Nav
  const LgNav = () => {
    return (
      <nav className="hidden lg:block">
        <ul className="flex gap-[54px]">
          {/* To include schema */}
          {navs.map((nav, id) => {
            return (
              <li key={id}>
                <Link href={nav.path}>
                  <a className="text-[18px] inline-flex items-center whitespace-nowrap font-sfLight leading-[36px] tracking-[-0.025em]">
                    {nav.label}
                    {nav.label === "Blog" && (
                      <ArrowRight style={{ transform: "rotate(-45deg)" }} />
                    )}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };
  let app_link = "https://chainapp.vercel.app";
  const Logo = () => {
    return (
      <div
        className="relative w-[118px] h-[24.09px]
        md:w-[140px] md:h-[30px]
        lg:w-[185px] lg:h-[39px]
        "
      >
        <Image
          layout="fill"
          src={"/logo.png"}
          objectFit="contain"
          priority
          quality={100}
          alt="Logo"
          placeholder="blur"
          blurDataURL="/logo.png"
        />
      </div>
    );
  };
  const closeNav = () => {
    setShow(false);
  };
  useEffect(() => {
    Router.events.on("routeChangeStart", closeNav);

    return () => Router.events.off("routeChangeStart", closeNav);
  }, []);
  return (
    <header
      className="mb-[108px] py-7 flex justify-between items-center 
    sm:py-7
    md:py-7
    lg:py-[54px] lg:mb-[90px]"
    >
      <div className="w-full max-w-[249px]">
        {" "}
        <Logo />
      </div>
      {/* Nav */}
      <LgNav />

      {/* Get started */}
      <div className="hidden gap-[15px] lg:flex">
        <Link href={`${app_link}/login`}>
          <a>
            <AppButton size="lg" label="Log In" variant="ghost" />
          </a>
        </Link>
        <Link href={`${app_link}/signup`}>
          <a>
            <AppButton size="lg" label="Get Started" variant="secondary" />
          </a>
        </Link>
      </div>

      {/* MObile hqmburger toggle */}
      <div
        className={`relative z-[106] cursor-pointer justify-center items-end flex flex-col gap-[10px] lg:hidden ${
          show ? "animate-bars" : "reshape-bars"
        }`}
        onClick={() => toggleNav(show ? false : true)}
      >
        <div className="bg-[#fff] w-[26px] h-[1px] bar"></div>
        <div className="bg-[#fff] w-[21px] h-[1px] bar"></div>
      </div>
      <MobileNav logo={<Logo />} navs={navs} show={show} setShow={toggleNav} />
    </header>
  );
};

export default memo(Header);
