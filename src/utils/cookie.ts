type TCookieProps = { 
  path?: string;
  expires?: unknown;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | null, props: TCookieProps) {
  props = props || {};
  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  } else if (exp instanceof Date && exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  if (value) value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;

  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName as keyof typeof props];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}