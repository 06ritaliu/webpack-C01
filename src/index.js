/*
 * @LastEditTime: 2025-03-13 18:18:20
 * @Description: 
 */
import addcontent from './add-content';
import * as style from './style.css';
import styles from './style.module.scss';

document.querySelector('#root').innerHTML = `<h1 class='${style.title}'>My first Webpack app here<span class='${styles?.title1}'>@@@!</span></h1>`;
// addcontent();