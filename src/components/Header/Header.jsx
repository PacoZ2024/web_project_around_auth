import LogoAround from "../../assets/images/Logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header__line">
        <img
          className="header__logo"
          src={LogoAround}
          alt="Logo Around The U.S."
        />
      </div>
    </header>
  );
}
