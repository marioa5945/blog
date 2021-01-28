import * as React from 'react';
import './dark.scss';

export interface ifsReactMdProps {
  markdown: string;
}

/**
 * react markdown component
 * @param props
 */
const ReactMd = (props: ifsReactMdProps): React.ReactElement => {
  const toLink = (str: string): string => {
    let value = str;
    const arr = /\[(.+?)\]\((.+?)\)/.exec(str);
    if (arr) {
      value = str.replace(arr[0], `<a href="${arr[2]}">${arr[1]}</a>`);
      value = toLink(value);
    }
    return value;
  };

  const toB = (str: string): string => {
    let value = str;
    const arr = /\*\*(.+?)\*\*/.exec(str);
    if (arr) {
      value = str.replace(arr[0], `<b>${arr[1]}</b>`);
      value = toB(value);
    }
    return value;
  };

  const toEm = (str: string): string => {
    let value = str;
    const arr = /[^/]_(.+?)_/.exec(str);
    if (arr) {
      value = str.replace(arr[0], `<em>${arr[1]}</em>`);
      value = toEm(value);
    }
    return value;
  };

  const toBlockquote = (str: string): string => {
    let value = str;
    if (value.slice(0, 2) === '> ') {
      value = `<blockquote><p>${value.slice(2)}</p></blockquote>`;
    }
    return value;
  };

  let listStart = false;
  const toList = (str: string): string => {
    if (str === '' && listStart) {
      listStart = false;
      return '</ul>';
    }

    const arr = / *- (.+)/.exec(str);
    let value = str;
    if (arr) {
      if (listStart) {
        value = `<li>${arr[1]}</li>`;
      } else {
        listStart = true;
        value = `<ul><li>${arr[1]}</li>`;
      }
    }
    return value;
  };

  let isPre = false;
  const toPre = (str: string): string => {
    let value = str;
    const arr = /^```(.*)/.exec(str);
    if (arr) {
      if (isPre) {
        value = str.replace(arr[0], '\n</code></pre>');
      } else {
        value = str.replace(arr[0], `<pre><code class="${arr[1]}">`);
      }
      isPre = !isPre;
    }
    return value;
  };

  /**
   * data formart to html
   */
  const dataFormart = (): string => {
    const arr = props.markdown.split('\n');
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== '') {
        arr[i] = toPre(arr[i]);
        arr[i] = toAnnotate(arr[i]);
        if (!isPre) {
          if (/^(\w|[\u2E80-\u9FFF])/.exec(arr[i]) && arr[i + 1] === '') {
            arr[i] = `<p>${arr[i]}</p>`;
          }
          arr[i] = toH(arr[i]);
          arr[i] = toLink(arr[i]);
          arr[i] = toB(arr[i]);
          arr[i] = toEm(arr[i]);
          arr[i] = toBlockquote(arr[i]);
          arr[i] = toList(arr[i]);
        }
      }
    }
    return arr.join('\n');
  };

  const toH = (str: string) => {
    const value = /(#+) (.+)/.exec(str);
    if (value) {
      return `<h${value[1].length}>${value[2]}</h${value[1].length}>`;
    }
    return str;
  };

  const toAnnotate = (str: string) => {
    let value = str;
    const arr = /(\/\*.+?\*\/)/.exec(str);
    if (arr) {
      value = str.replace(arr[0], `<span class="annotate">${arr[1]}</span>`);
      value = toEm(value);
    }
    return value;
  };

  return <div className={'markdown'} dangerouslySetInnerHTML={{ __html: dataFormart() }} />;
};

export default ReactMd;
