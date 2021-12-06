export const menu = document.createElement('div').textContent ='Import de fichiers OK'

export const menu1 = () => {
  const nav = document.createElement('nav')
  const ul = document.createElement('ul').textContent="Accueil";
  const ul1 = document.createElement('ul').textContent="Contact";
  nav.append(ul, ul1)
  return nav;
}

export const triangle = () => {
  const div = document.createElement('div')
  div.className="logo-menu"
  const div1 = document.createElement('div')
  div1.className="triangle1";
/*   const div2 = div1.cloneNode(true);
  div1.appendChild(div2) */
  const div3 = document.createElement('div')
  div3.className="triangle2"
/*   const div4 = div3.cloneNode(true)
  div3.appendChild(div4) */
  div.append(div1,div3)
  return div
}
