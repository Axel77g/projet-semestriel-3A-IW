export function htmlDecode(input) {
  const entities = [
    "&amp;|&",
    "&lt;|<",
    "&gt;|>",
    '&quot;|"',
    "&#x27;|'",
    "&#x60;|`",
    "&#x2F;|/",
    "&#039;|'",
  ];
  entities.forEach((element) => {
    let key = element.split("|")[0];
    let value = element.split("|")[1];

    input = input.replaceAll(key, value);
  });

  return input;
}
