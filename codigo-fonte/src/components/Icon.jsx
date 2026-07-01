import closeIcon from '../assets/icons/close.svg';
import crosshairIcon from '../assets/icons/crosshair.svg';
import gemIcon from '../assets/icons/gem.svg';
import loginIcon from '../assets/icons/login.svg';
import logoutIcon from '../assets/icons/logout.svg';
import menuIcon from '../assets/icons/menu.svg';
import newspaperIcon from '../assets/icons/newspaper.svg';
import playIcon from '../assets/icons/play.svg';
import saveIcon from '../assets/icons/save.svg';
import scrollIcon from '../assets/icons/scroll.svg';
import shieldIcon from '../assets/icons/shield.svg';
import shieldCheckIcon from '../assets/icons/shield-check.svg';
import shoppingBagIcon from '../assets/icons/shopping-bag.svg';
import swordsIcon from '../assets/icons/swords.svg';
import trashIcon from '../assets/icons/trash.svg';
import userIcon from '../assets/icons/user.svg';
import userCogIcon from '../assets/icons/user-cog.svg';
import userPlusIcon from '../assets/icons/user-plus.svg';

const icons = {
  close: closeIcon,
  crosshair: crosshairIcon,
  gem: gemIcon,
  login: loginIcon,
  logout: logoutIcon,
  menu: menuIcon,
  newspaper: newspaperIcon,
  play: playIcon,
  save: saveIcon,
  scroll: scrollIcon,
  shield: shieldIcon,
  shieldCheck: shieldCheckIcon,
  shoppingBag: shoppingBagIcon,
  swords: swordsIcon,
  trash: trashIcon,
  user: userIcon,
  userCog: userCogIcon,
  userPlus: userPlusIcon,
};

export function Icon({ name, size = 22, label = '' }) {
  return (
    <img
      className="svg-icon"
      src={icons[name]}
      width={size}
      height={size}
      alt={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
