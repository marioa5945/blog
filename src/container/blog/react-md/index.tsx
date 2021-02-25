import React from 'react';
import './dark.scss';

/**
 * react markdown component
 * @param props
 * @param {string}markdown
 */
const ReactMd = (props: { markdown: string }): React.ReactElement => {
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
    const arr = /_([^ ]+?)_|[^/]\*([^ ]+?)\*/.exec(str);
    if (arr) {
      value = str.replace(arr[0], `<em>${arr[1]}</em>`);
      value = toEm(value);
    }
    return value;
  };

  const toBlockquote = (str: string): string => {
    let value = str;
    if (value.slice(0, 2) === '> ') {
      value = `<blockquote><span>></span>${value.slice(2)}</blockquote>`;
    }
    return value;
  };

  let listStart = false;
  const toList = (str: string): string => {
    if (str.slice(0, 2) !== '- ' && listStart) {
      listStart = false;
      return `</ul>${str}`;
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
  let preName = '';
  const toPre = (str: string): string => {
    let value = str;
    const arr = /^```(.*)/.exec(str);
    if (arr) {
      if (isPre) {
        preName = '';
        value = str.replace(arr[0], '\n</code></pre>');
      } else {
        preName = arr[1] ?? '';
        value = str.replace(arr[0], `<pre><code class="${preName}">`);
      }
      isPre = !isPre;
    }
    return value;
  };

  /**
   * css key word
   */
  const toCss = (str: string): string => {
    let value = str;
    if (preName === 'css') {
      // variable
      let arr = /@[^ ]+/.exec(value);
      if (arr) {
        value = value.replace(arr[0], `<span class="variable">${arr[0]}</span>`);
      }

      // css name
      arr = /(^\.[^ ]+| \.[^ ]+) {/.exec(value);
      if (arr) {
        value = value.replace(arr[1], `<span class="cssName">${arr[1]}</span>`);
      }

      // attr name
      arr = /([^ (]+):/.exec(value);
      if (arr) {
        value = value.replace(arr[1], `<span class="attrName">${arr[1]}</span>`);
      }

      arr = /url\((.+?)\)/.exec(value);
      if (arr) {
        value = value.replace(arr[1], `<span class="attrName">${arr[1]}</span>`);
      }
      value = value.replace('url(', `<span class="key">url</span>(`);

      // num
      value = cssNumRepace(value);
    }

    return value;
  };

  const cssNumRepace = (str: string): string => {
    const arr = / (\d+\.?\d*)/g.exec(str);
    if (arr) {
      str = str.replace(arr[0], `<span class="num">${arr[1]}</span>`);
      str = cssNumRepace(str);
    }

    return str;
  };

  /**
   * ts key word
   * @param str
   */
  const toTs = (str: string): string => {
    let value = str;
    if (preName === 'ts' || preName === 'js' || preName === 'tsx' || preName === 'jsx') {
      value = tsRepace(/\{(\w+)\} /, value, 'type');

      const keys: Array<{
        name: string;
        list: Array<string>;
      }> = [
        {
          name: 'obj',
          list: ['console', 'window', 'devicePixelRatio'],
        },
        {
          name: 'fun',
          list: ['log'],
        },
        {
          name: 'key',
          list: ['const', 'let', 'typeof', 'instanceof', 'function', 'type', 'new', '=>', 'extends'],
        },
        {
          name: 'type',
          list: ['unknow', 'string', 'Array', 'number', 'never', 'Error', 'T', 'any', 'undefined', 'null'],
        },
        {
          name: 'symbol',
          list: ['throw', 'return', 'if', 'else', 'as', 'import', 'from', 'require'],
        },
      ];

      for (const item of keys) {
        const re = new RegExp(`(?:^|[^\\w>'])(${item.list.join('|')})[^\\w]`);
        value = tsRepace(re, value, item.name);
      }

      // key
      value = tsRepace(/ (\*) /, value, 'key');
      value = tsRepace(/[^>]([{])/, value, 'key');
      value = tsRepace(/([}])[^<]/, value, 'key');
      value = tsRepace(/([}])$/, value, 'key');

      // num
      value = tsRepace(/[( [](\d+)[ );,\]]/, value, 'num');

      // string
      value = tsRepace(/[( []('.+?')/, value, 'string');

      // fun
      value = tsRepace(/ ([^ >.]+?)\(/, value, 'fun');
      value = tsRepace(/\.([^ >]+?)\(/, value, 'fun');
      value = tsRepace(/ ([^ >]+?) = \(/, value, 'fun');
      value = tsRepace(/^([^ >]+?)\(/, value, 'fun');

      // obj
      value = tsRepace(/\(([^: >]+?)\)/, value, 'obj');
      value = tsRepace(/[ (]([^ >(]+?): /, value, 'obj');
      value = tsRepace(/^(\w+) /, value, 'obj');
      value = tsRepace(/ (\w+?)</, value, 'obj');
      value = tsRepace(/ ([^ >}.]+) =/, value, 'obj');
      value = tsRepace(/ *([^ ><[.']+?)[.[]/, value, 'obj');
      value = tsRepace(/\.(\w+?)[ ;]/, value, 'obj');
      value = tsRepace(/= (\w+);$/, value, 'obj');
      value = tsRepace(/[(, {[](\w+), /, value, 'obj');
      value = tsRepace(/, (\w+?)[,)}\]]/, value, 'obj');
      value = tsRepace(/{ (\w+) /, value, 'obj');
      value = tsRepace(/\((\w+?) /, value, 'obj');
      value = tsRepace(/ (\w+) /, value, 'obj');
      value = tsRepace(/ (\w+)=</, value, 'obj');
      value = tsRepace(/^(\w+): /, value, 'obj');

      // type
      value = tsRepace(/&lt;(\w+) /, value, 'type');
    }

    return value;
  };

  const tsRepace = (re: RegExp, str: string, className: string): string => {
    const arr = re.exec(str);
    if (arr) {
      const value = arr[0].replace(arr[1], `<span class="${className}">${arr[1]}</span>`);
      str = str.replace(arr[0], value);
      str = tsRepace(re, str, className);
    }
    return str;
  };

  /**
   * data formart to html
   */
  const dataFormart = (): string => {
    const arr = props.markdown.split('\n');
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== '') {
        arr[i] = arr[i].replace(/</g, '&lt;');

        arr[i] = toPre(arr[i]);
        arr[i] = toAnnotate(arr[i]);
        if (isPre && arr[i].indexOf('class="annotate"') === -1) {
          arr[i] = toCss(arr[i]);
          arr[i] = toTs(arr[i]);
        } else {
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
    value = tsRepace(/^ *(\/\*.+?\*\/)/, value, 'annotate');
    value = tsRepace(/^(\/\*.+)/, value, 'annotate');
    value = tsRepace(/^ (\* .+)/, value, 'annotate');
    value = tsRepace(/^ (\*\/)$/, value, 'annotate');
    value = tsRepace(/ +(\/\/ .+)/, value, 'annotate');
    value = tsRepace(/^(\/\/ .+)/, value, 'annotate');

    return value;
  };

  return <div className={'markdown'} dangerouslySetInnerHTML={{ __html: dataFormart() }} />;
};

export default ReactMd;
