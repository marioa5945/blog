import * as React from 'react';
import './style.scss';

interface ifsDirectory {
  id: string;
  title: string;
  date: string;
  description: string;
}
/**
 * hh
 */
interface ifsProps {
  title: React.ReactElement;
  list: Array<ifsDirectory>;
  activeId: string;
  handleNavClick: (activeId: string) => void;
  handleLogoClick: () => void;
}

export default class Nav extends React.PureComponent<ifsProps> {
  /**
   * nav
   * @param props
   */
  constructor(props: ifsProps) {
    super(props);
  }

  render(): React.ReactElement {
    const { title, list, activeId, handleNavClick, handleLogoClick } = this.props;

    return (
      <nav className={activeId === '' ? 'leftNav' : 'leftNav active'}>
        <img src={'/img/logo.png'} onClick={() => handleLogoClick()} />
        <h3 onClick={() => handleNavClick('')}>{title}</h3>
        {list.length > 0
          ? list.map((n) => (
              <p onClick={() => handleNavClick(n.id)} className={activeId === n.id ? 'active' : ''} key={n.id}>
                <span className={'title'}>{n.title}</span>
                <span>
                  <span>{n.date}</span>
                  {n.description}
                </span>
              </p>
            ))
          : null}
      </nav>
    );
  }
}
