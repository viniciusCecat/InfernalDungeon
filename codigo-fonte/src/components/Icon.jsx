import closeIcon from '../assets/icons/close.svg';
import coinDollarIcon from '../assets/icons/coin-dollar.svg';
import crosshairIcon from '../assets/icons/crosshair.svg';
import gemIcon from '../assets/icons/gem.svg';
import enemyIcon from '../assets/icons/enemy.svg';
import invaderIcon from '../assets/icons/invader.svg';
import loginIcon from '../assets/icons/login.svg';
import logoutIcon from '../assets/icons/logout.svg';
import maskIcon from '../assets/icons/mask.svg';
import merchantIcon from '../assets/icons/merchant.svg';
import menuIcon from '../assets/icons/menu.svg';
import newspaperIcon from '../assets/icons/newspaper.svg';
import playIcon from '../assets/icons/play.svg';
import saveIcon from '../assets/icons/save.svg';
import shieldIcon from '../assets/icons/shield.svg';
import shieldCheckIcon from '../assets/icons/shield-check.svg';
import shoppingBagIcon from '../assets/icons/shopping-bag.svg';
import supportIcon from '../assets/icons/support.svg';
import swordsIcon from '../assets/icons/swords.svg';
import towerIcon from '../assets/icons/tower.svg';
import trashIcon from '../assets/icons/trash.svg';
import userIcon from '../assets/icons/user.svg';
import userCogIcon from '../assets/icons/user-cog.svg';
import userPlusIcon from '../assets/icons/user-plus.svg';

const icons = {
  close: closeIcon,
  coinDollar: coinDollarIcon,
  crosshair: crosshairIcon,
  enemy: enemyIcon,
  gem: gemIcon,
  invader: invaderIcon,
  login: loginIcon,
  logout: logoutIcon,
  mask: maskIcon,
  merchant: merchantIcon,
  menu: menuIcon,
  newspaper: newspaperIcon,
  play: playIcon,
  save: saveIcon,
  shield: shieldIcon,
  shieldCheck: shieldCheckIcon,
  shoppingBag: shoppingBagIcon,
  support: supportIcon,
  swords: swordsIcon,
  tower: towerIcon,
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
