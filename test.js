const n = 94541;

const timeShower = (n) => {
    const days = (n - (n % 86400)) / 86400;
    n = n % 86400;
    const hours = (n - (n % 3600)) / 3600;
    n = n % 3600;
    const minuts = (n - (n % 60)) / 60;
    n = n % 60;
    const seconds = n;

    let str = '';

    if (days > 0) {
        str = days.toString().padStart(2, '0') + ':' + hours.toString().padStart(2, '0') + ':' + minuts.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    } else {
        str = hours.toString().padStart(2, '0') + ':' + minuts.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }

    return str;
}

console.log(timeShower(n));