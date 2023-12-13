  export default function randomId() {
    const length = 30;
    const uid = Array.from({ length }, () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    ).join('');
    return uid;
}

